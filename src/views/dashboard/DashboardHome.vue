<template>
  <section class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-6 py-8">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p class="mt-2 text-gray-600">Manage user profiles and pension submissions</p>
      </header>

      <div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div class="rounded-lg bg-white p-6 shadow-lg">
          <h3 class="text-lg font-bold text-gray-700">Total Submissions</h3>
          <p class="mt-2 text-3xl font-bold text-blue-700">{{ totalSubmissions }}</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-lg">
          <h3 class="text-lg font-bold text-gray-700">Pending Reviews</h3>
          <p class="mt-2 text-3xl font-bold text-amber-500">{{ pendingReviews }}</p>
        </div>
        <div class="rounded-lg bg-white p-6 shadow-lg">
          <button 
            @click="exportSubmissionsData('csv')"
            class="w-full rounded-lg bg-blue-700 px-4 py-2 text-white transition-colors hover:bg-blue-600"
            :disabled="loading"
          >
            Export Data
          </button>
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
        <div v-else-if="groupedSubmissions.length === 0" class="py-8 text-center text-gray-500">
          No submissions found.
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
                    <div class="text-sm text-gray-900">{{ group.user?.name }}</div>
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <div class="text-sm text-gray-500">{{ formatDate(group.kycProfile) }}</div>
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <div class="text-sm text-gray-500">{{ group.kycProfile?.gender }}</div>
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <div class="text-sm text-gray-500">{{ group.kycProfile?.national_insurance }}</div>
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <div class="text-sm text-gray-500">{{ group.user?.email }}</div>
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <div class="text-sm text-gray-500">{{ formatPhone(group.kycProfile?.mobile_country, group.kycProfile?.mobile_number) }}</div>
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
              :totalItems="totalSubmissions"
              @changePage="changePage"
            />
          </div>
        </div>
      </div>
      
      <SubmissionModal  
    v-if="submissionModalVisible"
    @close="closeSubmissionModal"
    :submissions="selectedProfile?.submissions || []"
    :user="selectedProfile?.user || null"
    :kycProfile="selectedProfile?.kycProfile || null"
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
}

interface KycProfile {
  id: string;
  user_id: string;
  dob_day: string;
  dob_month: string;
  dob_year: string;
  gender: string;
  national_insurance: string;
  mobile_country: string;
  mobile_number: string;
  postcode?: string;
  created_at?: string;
  updated_at?: string;
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

interface SubmissionGroup {
  user: User;
  kycProfile: KycProfile | null;
  submissions: Submission[];
}

interface FilterOptions {
  status?: SubmissionStatus;
  dateRange: {
    start: string;
    end: string;
  };
  search?: string;
}

interface ExportData {
  content: string;
  type: string;
}

interface StoreSubmission {
  user: User | null;
  kyc_profile: KycProfile | null;
  id: string;
  user_id: string;
  provider: string;
  policy_number: string | null;
  current_employer: boolean;
  signature_provided: boolean;
  created_at: string | null;
  status: SubmissionStatus;
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
    const selectedProfile = ref<SubmissionGroup | null>(null);
    const currentPage = ref(1);
    const pageSize = 10;
    
    const totalPages = computed(() => Math.ceil(adminStore.totalSubmissions / pageSize));

    const groupedSubmissions = computed((): SubmissionGroup[] => {
      const groups = new Map<string, SubmissionGroup>();
      
      (adminStore.submissions as StoreSubmission[]).forEach(item => {
        if (!item.user) return;
        
        if (!groups.has(item.user.id)) {
          // Ensure we have a valid User object
          const user: User = {
            id: item.user.id,
            name: item.user.name,
            email: item.user.email
          };

          // Initialize group with required non-null user
          groups.set(item.user.id, {
            user,
            kycProfile: item.kyc_profile,
            submissions: []
          });
        }

        const group = groups.get(item.user.id);
        if (group) {
          const submission: Submission = {
            id: item.id,
            user_id: item.user_id,
            provider: item.provider,
            policy_number: item.policy_number,
            current_employer: item.current_employer,
            signature_provided: item.signature_provided,
            created_at: item.created_at || new Date().toISOString(),
            status: item.status
          };
          group.submissions.push(submission);
        }
      });

      return Array.from(groups.values());
    });
    
    const fetchSubmissions = () => {
      return adminStore.fetchAllSubmissionsWithProfiles(
        currentPage.value,
        pageSize,
        filters.value
      );
    };

    onMounted(fetchSubmissions);
    
    const exportSubmissionsData = async (format: 'csv' | 'xlsx') => {
      try {
        const response = await adminStore.exportSubmissionsData(format, filters.value);
        // First cast to unknown, then to ExportData to satisfy TypeScript
        const data = (response as unknown) as ExportData;
        const blob = new Blob([data.content], { type: data.type });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', `submissions.${format}`);
        link.click();
      } catch (err) {
        console.error('Failed to export submissions:', err);
      }
    };

    const showSubmissionDetails = (profile: SubmissionGroup) => {
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

    const hasStatus = (submissions: Submission[], status: SubmissionStatus): boolean => {
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
      if (!profile) return '';
      const { dob_day, dob_month, dob_year } = profile;
      if (!dob_day || !dob_month || !dob_year) return '';
      return `${dob_day.padStart(2, '0')}/${dob_month.padStart(2, '0')}/${dob_year}`;
    };

    const formatPhone = (country?: string | null, number?: string | null) => {
      if (!country || !number) return '';
      return `+${country} ${number}`;
    };
    
    return {
      submissions: computed(() => adminStore.submissions),
      groupedSubmissions,
      loading: computed(() => adminStore.loading),
      error: computed(() => adminStore.error),
      totalSubmissions: computed(() => adminStore.totalSubmissions),
      pendingReviews: computed(() => adminStore.pendingReviews),
      filters,
      submissionModalVisible,
      selectedProfile,
      currentPage,
      totalPages,
      exportSubmissionsData,
      showSubmissionDetails,
      closeSubmissionModal,
      handleStatusUpdate,
      hasStatus,
      changePage,
      fetchSubmissions,
      onSearchInput,
      formatDate,
      formatPhone
    };
  }
});
</script>