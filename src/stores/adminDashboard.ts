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

interface SubmissionWithProfile {
  submission: PensionSubmission;
  kycProfile: KycProfile | null;
  user: User | null;
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
  const submissions = ref<SubmissionWithProfile[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const totalSubmissions = ref<number>(0);
  const pendingReviews = ref<number>(0);

  const fetchAllSubmissionsWithProfiles = async (
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
      logger.info('Fetching submissions with profiles', { page, limit, filters });

      let query = supabase
        .from('pension_submissions')
        .select<string, PensionSubmission>('*', { count: 'exact' });

      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      if (filters.dateRange?.start && filters.dateRange?.end) {
        query = query
          .gte('created_at', filters.dateRange.start)
          .lte('created_at', filters.dateRange.end);
      }

      if (filters.search) {
        query = query.or(
          `provider.ilike.%${filters.search}%,policy_number.ilike.%${filters.search}%`
        );
      }

      const from = (page - 1) * limit;
      const to = from + limit - 1;
      
      const { data: submissionsData, error: fetchError, count } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

      if (fetchError) {
        logger.error('Error fetching submissions', fetchError);
        throw new Error(fetchError.message);
      }

      if (submissionsData) {
        const userIds = submissionsData.map(s => s.user_id);

        const { data: kycProfiles } = await supabase
          .from('kyc_profile')
          .select<string, KycProfile>('*')
          .in('user_id', userIds);

        const { data: users } = await supabase
          .from('users')
          .select<string, User>('*')
          .in('id', userIds);

        const kycProfileMap = new Map(
          kycProfiles?.map(profile => [profile.user_id, profile]) || []
        );
        const userMap = new Map(
          users?.map(user => [user.id, user]) || []
        );

        submissions.value = submissionsData.map(submission => ({
          submission: {
            id: submission.id,
            user_id: submission.user_id,
            provider: submission.provider,
            policy_number: submission.policy_number,
            current_employer: submission.current_employer,
            signature_provided: submission.signature_provided,
            created_at: submission.created_at,
            status: submission.status
          },
          kycProfile: kycProfileMap.get(submission.user_id) || null,
          user: userMap.get(submission.user_id) || null
        }));

        totalSubmissions.value = count || 0;
        pendingReviews.value = submissionsData.filter(item => item.status === 'not_started').length;
        
        logger.info(`Fetched ${submissionsData.length} submissions`, { 
          total: count,
          pending: pendingReviews.value 
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch submissions';
      error.value = errorMessage;
      logger.error('Failed to fetch submissions with profiles', { error: errorMessage });
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
        .select<string, PensionSubmission>()
        .single();

      if (updateError) {
        logger.error('Error updating submission status', updateError);
        throw new Error(updateError.message);
      }

      if (data) {
        const index = submissions.value.findIndex(s => s.submission.id === submissionId);
        if (index !== -1) {
          submissions.value[index].submission = {
            ...submissions.value[index].submission,
            status: data.status
          };
        }
      }

      logger.info('Successfully updated submission status', { submissionId, status });
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

  const exportSubmissionsData = async (
    format: 'csv' | 'xlsx' = 'csv',
    filters: {
      status?: SubmissionStatus;
      dateRange?: { start: string; end: string };
    } = {}
  ) => {
    loading.value = true;
    error.value = null;

    try {
      logger.info('Exporting submissions data', { format, filters });

      let query = supabase
        .from('pension_submissions')
        .select<string, PensionSubmission>('*');

      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      if (filters.dateRange?.start && filters.dateRange?.end) {
        query = query
          .gte('created_at', filters.dateRange.start)
          .lte('created_at', filters.dateRange.end);
      }

      const { data: submissionsData, error: exportError } = await query;

      if (exportError) {
        logger.error('Error exporting submissions data', exportError);
        throw new Error(exportError.message);
      }

      if (submissionsData) {
        const userIds = submissionsData.map(s => s.user_id);

        const [{ data: kycProfiles }, { data: users }] = await Promise.all([
          supabase
            .from('kyc_profile')
            .select<string, KycProfile>('*')
            .in('user_id', userIds),
          supabase
            .from('users')
            .select<string, User>('*')
            .in('id', userIds)
        ]);

        const kycProfileMap = new Map(
          kycProfiles?.map(profile => [profile.user_id, profile]) || []
        );
        const userMap = new Map(
          users?.map(user => [user.id, user]) || []
        );

        const enrichedData = submissionsData.map(submission => ({
          ...submission,
          user: userMap.get(submission.user_id) || null,
          kyc_profile: kycProfileMap.get(submission.user_id) || null
        }));

        logger.info(`Successfully exported ${enrichedData.length} submissions`);
        return enrichedData;
      }

      return [];
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to export submissions data';
      error.value = errorMessage;
      logger.error('Failed to export submissions data', { error: errorMessage });
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    submissions,
    loading,
    error,
    totalSubmissions,
    pendingReviews,
    fetchAllSubmissionsWithProfiles,
    updateSubmissionStatus,
    exportSubmissionsData
  };
});