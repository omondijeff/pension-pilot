import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabase';
import { ref } from 'vue';
import type { User } from '@/lib/database.types';

type SubmissionStatus = 'not_started' | 'in_process' | 'consolidated';

interface PensionSubmission {
  id: string;
  user_id: string;
  provider: string;
  policy_number: string | null;
  current_employer: boolean;
  signature_provided: boolean;
  created_at: string | null;
  status: SubmissionStatus;
}

interface KycProfile {
  id: string;
  user_id: string;
  dob_day: string | null;
  dob_month: string | null;
  dob_year: string | null;
  gender: string | null;
  mobile_country: string | null;
  mobile_number: string | null;
  national_insurance: string | null;
  postcode: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface UserGroup {
  user: User;
  kycProfile: KycProfile | null;
  submissions: PensionSubmission[];
}

const logger = {
  info: (message: string, data?: any) => {
    console.log(`[Admin Dashboard Store] INFO: ${message}`, data || '');
  },
  error: (message: string, data?: any) => {
    console.error(`[Admin Dashboard Store] ERROR: ${message}`, data || '');
  },
  warn: (message: string, data?: any) => {
    console.warn(`[Admin Dashboard Store] WARN: ${message}`, data || '');
  }
};

export const useAdminDashboardStore = defineStore('adminDashboard', () => {
  const userGroups = ref<UserGroup[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const totalUsers = ref<number>(0);
  const totalSubmissions = ref<number>(0);
  const pendingReviews = ref<number>(0);

  const fetchAllUsersWithData = async (
    page: number = 1,
    limit: number = 10,
    filters: {
      status?: SubmissionStatus;
      dateRange?: { start: string; end: string };
      search?: string;
    } = {}
  ) => {
    loading.value = true;
    error.value = null;

    try {
      logger.info('Fetching users and related data', { page, limit, filters });

      // Calculate pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      // First, fetch all users
      const { data: users, error: usersError, count } = await supabase
        .from('users')
        .select('*', { count: 'exact' })
        .range(from, to)
        .order('created_at', { ascending: false });

      if (usersError) throw new Error(usersError.message);
      if (!users) throw new Error('No users found');

      totalUsers.value = count || 0;
      
      // Get user IDs for related data queries
      const userIds = users.map((user: User) => user.id);

      // Fetch KYC profiles and submissions in parallel
      const [{ data: kycProfiles }, { data: submissions }] = await Promise.all([
        supabase
          .from('kyc_profile')
          .select('*')
          .in('user_id', userIds),
        supabase
          .from('pension_submissions')
          .select('*')
          .in('user_id', userIds)
      ]);

      // Create maps for efficient lookups
      const kycProfileMap = new Map(
        kycProfiles?.map((profile: KycProfile) => [profile.user_id, profile]) || []
      );

      const submissionsMap = new Map<string, PensionSubmission[]>();
      submissions?.forEach((submission: PensionSubmission) => {
        const userSubmissions = submissionsMap.get(submission.user_id) || [];
        userSubmissions.push(submission);
        submissionsMap.set(submission.user_id, userSubmissions);
      });

      // Apply filters to submissions if needed
      if (filters.status || filters.dateRange || filters.search) {
        submissionsMap.forEach((userSubmissions, userId) => {
          let filteredSubmissions = userSubmissions;

          if (filters.status) {
            filteredSubmissions = filteredSubmissions.filter(
              sub => sub.status === filters.status
            );
          }

          if (filters.dateRange?.start && filters.dateRange?.end) {
            filteredSubmissions = filteredSubmissions.filter(
              sub => sub.created_at && 
              sub.created_at >= filters.dateRange!.start &&
              sub.created_at <= filters.dateRange!.end
            );
          }

          if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filteredSubmissions = filteredSubmissions.filter(
              sub => sub.provider.toLowerCase().includes(searchLower) ||
                     sub.policy_number?.toLowerCase().includes(searchLower)
            );
          }

          submissionsMap.set(userId, filteredSubmissions);
        });
      }

      // Group all data by user
      userGroups.value = users.map((user: User) => ({
        user,
        kycProfile: kycProfileMap.get(user.id) || null,
        submissions: submissionsMap.get(user.id) || []
      }));

      // Calculate totals
      totalSubmissions.value = Array.from(submissionsMap.values())
        .reduce((acc, submissions) => acc + submissions.length, 0);

      pendingReviews.value = Array.from(submissionsMap.values())
        .reduce((acc, submissions) => 
          acc + submissions.filter(sub => sub.status === 'not_started').length, 0
        );

      logger.info('Successfully fetched user data', {
        users: users.length,
        totalSubmissions: totalSubmissions.value,
        pendingReviews: pendingReviews.value
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user data';
      error.value = errorMessage;
      logger.error('Failed to fetch user data', { error: errorMessage });
    } finally {
      loading.value = false;
    }
  };

  const updateSubmissionStatus = async (
    submissionId: string,
    status: SubmissionStatus
  ) => {
    loading.value = true;
    error.value = null;

    try {
      logger.info('Updating submission status', { submissionId, status });

      const { data, error: updateError } = await supabase
        .from('pension_submissions')
        .update({ status })
        .eq('id', submissionId)
        .select()
        .single();

      if (updateError) throw new Error(updateError.message);
      if (!data) throw new Error('No data returned from update');

      // Update local state
      for (const group of userGroups.value) {
        const submissionIndex = group.submissions.findIndex(s => s.id === submissionId);
        if (submissionIndex !== -1) {
          group.submissions[submissionIndex].status = status;
          break;
        }
      }

      logger.info('Successfully updated submission status');
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update submission status';
      error.value = errorMessage;
      logger.error('Failed to update submission status', { error: errorMessage });
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    userGroups,
    loading,
    error,
    totalUsers,
    totalSubmissions,
    pendingReviews,
    fetchAllUsersWithData,
    updateSubmissionStatus
  };
});