<template>
  <section class="user-profile-page bg-gray-50 min-h-screen">
    <!-- Banner Section with Skeleton Loading -->
    <div
      class="banner w-full h-64 bg-cover bg-center relative transition-opacity duration-300"
      :style="bannerBackgroundStyle"
      :class="{ 'opacity-0': isLoading }"
    >
      <div class="flex items-center justify-center h-full bg-black/40">
        <h1 class="text-4xl md:text-5xl font-gilroy-bold text-white">Your Profile</h1>
      </div>
    </div>

    <!-- Profile Section -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-8">
        <div class="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
        <div class="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      <!-- Content State -->
      <div v-else class="space-y-8">
        <!-- Personal Information -->
        <div class="profile-card bg-white shadow-lg rounded-lg p-6 sm:p-8">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-2xl sm:text-3xl font-gilroy-bold text-gray-800">
              Welcome, {{ userName }}
            </h2>
            <button
              class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-lg font-gilroy-bold hover:opacity-90 transition-all duration-200 ease-in-out hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              @click="openEditModal"
            >
              <PencilIcon class="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(info, index) in profileInfo" :key="index" class="space-y-2">
              <h3 class="text-lg font-gilroy-bold text-gray-700">{{ info.title }}</h3>
              <p class="text-gray-600 font-gilroy-light">{{ info.value }}</p>
            </div>
          </div>
        </div>

        <!-- Submitted Pensions -->
        <div class="pensions-card bg-white shadow-lg rounded-lg p-6 sm:p-8">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-2xl sm:text-3xl font-gilroy-bold text-gray-800">
              Submitted Pensions
            </h2>
            <router-link 
              to="/add-pension"
              class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-gilroy-bold hover:opacity-90 transition-all duration-200 ease-in-out hover:scale-105 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <PlusIcon class="h-4 w-4 mr-2" />
              Add Pension
            </router-link>
          </div>

          <ul v-if="pensions.length" class="space-y-6">
            <li
              v-for="pension in pensions"
              :key="pension.id"
              class="border-b border-gray-200 last:border-none pb-4 transition-all duration-300"
            >
              <div class="flex flex-col sm:flex-row sm:items-center justify-between">
                <div class="space-y-2">
                  <h3 class="text-lg font-gilroy-bold text-gray-700">
                    {{ pension.provider }}
                  </h3>
                  <div class="space-y-1 text-sm text-gray-600">
                    <p><span class="font-medium">Policy Number:</span> {{ pension.policy_number || 'N/A' }}</p>
                    <p><span class="font-medium">Current Employer:</span> {{ pension.current_employer ? 'Yes' : 'No' }}</p>
                    <p><span class="font-medium">Submitted:</span> {{ formatDate(pension.created_at) }}</p>
                  </div>
                </div>
                <div class="mt-4 sm:mt-0">
                  <span 
                    :class="[
                      'px-3 py-1 rounded-full text-sm',
                      pension.current_employer 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    ]"
                  >
                    {{ pension.current_employer ? 'Active' : 'Previous' }}
                  </span>
                </div>
              </div>
            </li>
          </ul>

          <div v-else class="text-center py-8 text-gray-500">
            <FolderIcon class="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p class="font-gilroy-light">No pensions submitted yet.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="closeEditModal"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-gilroy-bold text-gray-800">Edit Profile</h2>
            <button 
              @click="closeEditModal"
              class="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon class="h-6 w-6" />
            </button>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Form fields remain the same -->
            <!-- ... -->
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { 
  PencilIcon, 
  PlusIcon,
  FolderIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline';
import { useKycProfileStore } from '@/stores/kycProfile';
import { usePensionSubmissionsStore } from '@/stores/pensionSubmissions';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import bannerImage from '@/assets/profile-banner.png';

// Type definitions
interface KycProfile {
  id: string;
  dob_day: string;
  dob_month: string;
  dob_year: string;
  gender: string;
  mobile_country: string;
  mobile_number: string;
  postcode: string;
  national_insurance?: string;
}

interface KycProfileUpdate extends Omit<KycProfile, 'id'> {
  id?: string;
}

interface PensionSubmission {
  id: string;
  user_id: string;
  provider: string;
  policy_number: string | null;
  current_employer: boolean;
  signature_provided: boolean;
  created_at: string | null;
}

interface ProfileForm {
  dob: {
    day: string;
    month: string;
    year: string;
  };
  gender: string;
  mobile: {
    country: string;
    number: string;
  };
  postcode: string;
}

// Store instances
const kycStore = useKycProfileStore();
const pensionStore = usePensionSubmissionsStore();
const authStore = useAuthStore();
const router = useRouter();

// State
const showModal = ref(false);
const isLoading = ref(true);
const userProfile = ref<KycProfile | null>(null);
const pensions = ref<PensionSubmission[]>([]);
const userName = ref('User');

// Computed
const profileInfo = computed(() => [
  {
    title: 'Date of Birth',
    value: userProfile.value 
      ? `${userProfile.value.dob_day}/${userProfile.value.dob_month}/${userProfile.value.dob_year}`
      : 'Not provided'
  },
  {
    title: 'Gender',
    value: userProfile.value?.gender || 'Not provided'
  },
  {
    title: 'Mobile Number',
    value: userProfile.value
      ? `${userProfile.value.mobile_country} ${userProfile.value.mobile_number}`
      : 'Not provided'
  },
  {
    title: 'Postcode',
    value: userProfile.value?.postcode || 'Not provided'
  },
  {
    title: 'National Insurance Number',
    value: userProfile.value?.national_insurance || 'Not provided'
  }
]);

const bannerBackgroundStyle = computed(() => ({
  backgroundImage: `url(${bannerImage})`
}));

// Form state
const form = reactive<ProfileForm>({
  dob: { day: '', month: '', year: '' },
  gender: '',
  mobile: { country: 'UK', number: '' },
  postcode: ''
});

// Methods
function formatDate(date: string | null): string {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

async function fetchUserProfile() {
  if (!authStore.user?.id) return;
  
  try {
    await kycStore.fetchKycProfile(authStore.user.id);
    userProfile.value = kycStore.kycProfile;
    userName.value = authStore.user?.name || 'User';
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
  }
}

async function fetchPensions() {
  if (!authStore.user?.id) return;

  try {
    await pensionStore.fetchSubmissions(authStore.user.id);
    pensions.value = pensionStore.submissions;
  } catch (error) {
    console.error('Failed to fetch pensions:', error);
  }
}

function openEditModal() {
  if (userProfile.value) {
    form.dob.day = userProfile.value.dob_day;
    form.dob.month = userProfile.value.dob_month;
    form.dob.year = userProfile.value.dob_year;
    form.gender = userProfile.value.gender;
    form.mobile.country = userProfile.value.mobile_country;
    form.mobile.number = userProfile.value.mobile_number;
    form.postcode = userProfile.value.postcode;
  }
  showModal.value = true;
}

function closeEditModal() {
  showModal.value = false;
}

async function handleSubmit() {
  if (!authStore.user?.id || !userProfile.value) return;

  try {
    const updatedProfile: KycProfileUpdate = {
      dob_day: form.dob.day,
      dob_month: form.dob.month,
      dob_year: form.dob.year,
      gender: form.gender,
      mobile_country: form.mobile.country,
      mobile_number: form.mobile.number,
      postcode: form.postcode
    };

    await kycStore.updateKycProfile(authStore.user.id, updatedProfile);
    
    if (userProfile.value) {
      userProfile.value = { 
        ...userProfile.value, 
        ...updatedProfile
      };
    }
    
    closeEditModal();
  } catch (error) {
    console.error('Failed to update profile:', error);
  }
}

// Lifecycle
onMounted(async () => {
  if (!authStore.isLoggedIn || !authStore.user) {
    router.push('/login');
    return;
  }

  try {
    await Promise.all([
      fetchUserProfile(),
      fetchPensions()
    ]);
  } catch (error) {
    console.error('Error loading profile data:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>


<style scoped>
.user-profile-page {
  background-color: #f9fafb;
}

.banner {
  background-size: cover;
  background-position: center;
}

.profile-card,
.pensions-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

button {
  transition: background-color 0.3s ease, transform 0.2s ease;
}
</style>