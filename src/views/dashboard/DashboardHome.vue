<template>
  <section class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-6 py-8">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p class="mt-2 text-gray-600">Manage user profiles and pension submissions</p>
      </header>

      <div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div class="rounded-lg bg-white p-6 shadow-lg">
          <h3 class="text-lg font-bold text-gray-700">Total Users</h3>
          <p class="mt-2 text-3xl font-bold text-blue-700">{{ totalUsers || 0 }}</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-lg">
          <h3 class="text-lg font-bold text-gray-700">Pending Reviews</h3>
          <p class="mt-2 text-3xl font-bold text-amber-500">{{ pendingReviews || 0 }}</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-lg">
          <h3 class="text-lg font-bold text-gray-700">Total Submissions</h3>
          <p class="mt-2 text-3xl font-bold text-green-700">{{ totalSubmissions || 0 }}</p>
        </div>
      </div>

      <div class="mb-8 rounded-lg bg-white p-6 shadow-lg">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div>
            <label class="mb-2 block text-sm font-bold text-gray-700">Status</label>
            <select 
              v-model="filters.status"
              class="w-full rounded-lg border px-3 py-2"
              @change="fetchSubmissions"
            >
              <option value="">All Statuses</option>
              <option value="consolidated">Consolidated</option>
              <option value="in_process">In Process</option>
              <option value="not_started">Not Started</option>
            </select>
          </div>
          <div>
            <label class="mb-2 block text-sm font-bold text-gray-700">Date Range</label>
            <input 
              type="date" 
              v-model="filters.dateRange.start"
              class="mb-2 w-full rounded-lg border px-3 py-2"
              @change="fetchSubmissions"
            />
            <input 
              type="date" 
              v-model="filters.dateRange.end"
              class="w-full rounded-lg border px-3 py-2"
              @change="fetchSubmissions"
            />
          </div>
          <div>
            <label class="mb-2 block text-sm font-bold text-gray-700">Search</label>
            <input 
              type="text" 
              v-model="filters.search"
              placeholder="Search submissions..."
              class="w-full rounded-lg border px-3 py-2"
              @input="onSearchInput"
            />
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-white shadow-lg">
        <div v-if="loading" class="py-8 text-center">
          <div class="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-700"></div>
        </div>
        <div v-else-if="error" class="py-8 text-center text-red-500">
          {{ error }}
        </div>
        <div v-else-if="!groupedSubmissions.length" class="py-8 text-center text-gray-500">
          No users found.
        </div>
        <div v-else>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="whitespace-nowrap px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Name</th>
                  <th scope="col" class="whitespace-nowrap px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">DoB</th>
                  <th scope="col" class="whitespace-nowrap px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Gender</th>
                  <th scope="col" class="whitespace-nowrap px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">NI Number</th>
                  <th scope="col" class="whitespace-nowrap px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Email</th>
                  <th scope="col" class="whitespace-nowrap px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Phone</th>
                  <th scope="col" class="whitespace-nowrap px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Status</th>
                  <th scope="col" class="whitespace-nowrap px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="group in groupedSubmissions" :key="group.user.id">
                  <td class="whitespace-nowrap px-6 py-4">
                    <div class="text-sm text-gray-900">{{ group.user.name }}</div>
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <div class="text-sm text-gray-500">{{ formatDate(group.kycProfile) }}</div>
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <div class="text-sm text-gray-500">{{ group.kycProfile?.gender || '-' }}</div>
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <div class="text-sm text-gray-500">{{ group.kycProfile?.national_insurance || '-' }}</div>
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <div class="text-sm text-gray-500">{{ group.user.email }}</div>
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <div class="text-sm text-gray-500">
                      {{ formatPhone(group.kycProfile?.mobile_country, group.kycProfile?.mobile_number) }}
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <div class="flex space-x-2">
                      <div v-if="hasStatus(group.submissions, 'not_started')"
                           class="h-3 w-3 rounded-full bg-red-400"
                           title="Not Started">
                      </div>
                      <div v-if="hasStatus(group.submissions, 'in_process')"
                           class="h-3 w-3 rounded-full bg-amber-400"
                           title="In Process">
                      </div>
                      <div v-if="hasStatus(group.submissions, 'consolidated')"
                           class="h-3 w-3 rounded-full bg-green-400"
                           title="Consolidated">
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <button
                      @click="showSubmissionDetails(group)"
                      class="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      View Details ({{ group.submissions.length }})
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="bg-white px-6 py-4">
            <Pagination
              :currentPage="currentPage"
              :totalPages="totalPages"
              :totalItems="totalUsers"
              @changePage="changePage"
            />
          </div>
        </div>
      </div>
      
      <SubmissionModal 
        v-if="submissionModalVisible"
        :submissions="activeSubmissions"
        :user="activeUser!"
        :kycProfile="activeKycProfile!"
        @close="closeSubmissionModal"
        @update-status="handleStatusUpdate"
      />
    </div>
  </section>
</template>


<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useAdminDashboardStore } from '@/stores/adminDashboard';
import SubmissionModal from '@/components/SubmissionModal.vue';
import Pagination from '@/components/Pagination.vue';

type SubmissionStatus = 'not_started' | 'in_process' | 'consolidated';

interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface KycProfile {
  id: string;
  user_id: string;
  dob_day: string | null;
  dob_month: string | null;
  dob_year: string | null;
  gender: string | null;
  national_insurance: string | null;
  mobile_country: string | null;
  mobile_number: string | null;
  postcode: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface Submission {
  id: string;
  user_id: string;
  provider: string;
  policy_number: string | null;
  current_employer: boolean;
  signature_provided: boolean;
  created_at: string;
  status: SubmissionStatus;
}

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

interface UserGroup {
  user: User;
  kycProfile: KycProfile | null;
  submissions: PensionSubmission[];
}

interface FilterOptions {
  status?: SubmissionStatus;
  dateRange: {
    start: string;
    end: string;
  };
  search?: string;
}

export default defineComponent({
  name: 'AdminDashboard',
  components: {
    SubmissionModal,
    Pagination
  },
  setup() {
    const adminStore = useAdminDashboardStore();

    const filters = ref<FilterOptions>({
      status: undefined,
      dateRange: {
        start: '',
        end: ''
      },
      search: ''
    });
    
    const submissionModalVisible = ref(false);
    const selectedProfile = ref<UserGroup | null>(null);
    const currentPage = ref(1);
    const pageSize = 10;
    
    const totalPages = computed(() => Math.ceil((adminStore.totalUsers || 0) / pageSize));

    const groupedSubmissions = computed(() => {
      if (!adminStore.userGroups) return [];
      
      return adminStore.userGroups.filter(group => {
        if (filters.value.status) {
          return group.submissions.some(sub => sub.status === filters.value.status);
        }
        return true;
      });
    });
    
    const displaySubmissionModal = computed(() => {
      return submissionModalVisible.value && selectedProfile.value !== null;
    });

    const activeUser = computed(() => selectedProfile.value?.user);
    const activeKycProfile = computed(() => selectedProfile.value?.kycProfile);
    const activeSubmissions = computed(() => {
      const submissions = selectedProfile.value?.submissions || [];
      return submissions.map(sub => ({
        ...sub,
        created_at: sub.created_at || new Date().toISOString()
      })) as Submission[];
    });
    
    const fetchSubmissions = () => {
      return adminStore.fetchAllUsersWithData(
        currentPage.value,
        pageSize,
        filters.value
      );
    };

    onMounted(() => {
      fetchSubmissions();
    });
    
    const showSubmissionDetails = (profile: UserGroup) => {
      selectedProfile.value = profile;
      submissionModalVisible.value = true;
    };

    const closeSubmissionModal = () => {
      submissionModalVisible.value = false;
      selectedProfile.value = null;
    };

    const handleStatusUpdate = async (submissionId: string, status: SubmissionStatus) => {
      try {
        await adminStore.updateSubmissionStatus(submissionId, status);
        await fetchSubmissions();
      } catch (err) {
        console.error('Failed to update status:', err);
      }
    };

    const hasStatus = (submissions: Array<PensionSubmission>, status: SubmissionStatus): boolean => {
      return submissions.some(sub => sub.status === status);
    };
    
    const changePage = (page: number) => {
      currentPage.value = page;
      fetchSubmissions();
    };
    
    let searchTimeout: ReturnType<typeof setTimeout>;
    const onSearchInput = () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      searchTimeout = setTimeout(fetchSubmissions, 300);
    };
    
    const formatDate = (profile: KycProfile | null) => {
      if (!profile?.dob_day || !profile?.dob_month || !profile?.dob_year) return '-';
      return `${profile.dob_day.padStart(2, '0')}/${profile.dob_month.padStart(2, '0')}/${profile.dob_year}`;
    };

    const formatPhone = (country?: string | null, number?: string | null) => {
      if (!country || !number) return '-';
      return `+${country} ${number}`;
    };
    
    return {
      groupedSubmissions,
      loading: computed(() => adminStore.loading),
      error: computed(() => adminStore.error),
      totalUsers: computed(() => adminStore.totalUsers),
      totalSubmissions: computed(() => adminStore.totalSubmissions),
      pendingReviews: computed(() => adminStore.pendingReviews),
      filters,
      submissionModalVisible: displaySubmissionModal,
      selectedProfile,
      currentPage,
      totalPages,
      showSubmissionDetails,
      closeSubmissionModal,
      handleStatusUpdate,
      hasStatus,
      changePage,
      fetchSubmissions,
      onSearchInput,
      formatDate,
      formatPhone,
      activeUser,
      activeKycProfile,
      activeSubmissions
    };
  }
});
</script>