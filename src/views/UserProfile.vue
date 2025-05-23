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
    <div class="mt-4 sm:mt-0 flex items-center space-x-3">
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
      <button
        @click="openPensionModal(pension)"
        class="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
      >
        <PencilIcon class="h-4 w-4 mr-1" />
        Edit
      </button>
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

    <!-- Edit Pension Modal -->
<div
  v-if="showPensionModal"
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
  @click.self="closePensionModal"
>
  <div class="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-gilroy-bold text-gray-800">Edit Pension</h2>
        <button 
          @click="closePensionModal"
          class="text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon class="h-6 w-6" />
        </button>
      </div>

      <form @submit.prevent="handlePensionSubmit" class="space-y-6">
        <!-- Provider -->
        <div class="space-y-2">
          <label class="block text-sm font-gilroy-bold text-gray-700">Provider</label>
          <input
            type="text"
            v-model="pensionForm.provider"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <!-- Policy Number -->
        <div class="space-y-2">
          <label class="block text-sm font-gilroy-bold text-gray-700">Policy Number</label>
          <input
            type="text"
            v-model="pensionForm.policy_number"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Optional"
          />
        </div>

        <!-- Current Employer -->
        <div class="space-y-2">
          <label class="block text-sm font-gilroy-bold text-gray-700">Current Employer</label>
          <select
            v-model="pensionForm.current_employer"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option :value="true">Yes</option>
            <option :value="false">No</option>
          </select>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="closePensionModal"
            class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-lg font-gilroy-bold hover:opacity-90 transition-all duration-200 ease-in-out hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </form>
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
  <!-- Date of Birth -->
  <div class="space-y-2">
    <label class="block text-sm font-gilroy-bold text-gray-700">Date of Birth</label>
    <div class="grid grid-cols-3 gap-4">
      <div>
        <input
          type="text"
          v-model="form.dob.day"
          placeholder="DD"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          maxlength="2"
        />
      </div>
      <div>
        <input
          type="text"
          v-model="form.dob.month"
          placeholder="MM"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          maxlength="2"
        />
      </div>
      <div>
        <input
          type="text"
          v-model="form.dob.year"
          placeholder="YYYY"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          maxlength="4"
        />
      </div>
    </div>
  </div>

  <!-- Gender -->
  <div class="space-y-2">
    <label class="block text-sm font-gilroy-bold text-gray-700">Gender</label>
    <select
      v-model="form.gender"
      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">Select gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
      <option value="Prefer_Not_To_Say">Prefer not to say</option>
    </select>
  </div>

  <!-- Mobile Number -->
  <div class="space-y-2">
      <label class="block text-sm font-gilroy-bold text-gray-700">Mobile Number</label>
      <div class="grid grid-cols-3 gap-4">
        <div>
          <select
            v-model="form.mobile.country"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            @change="validateAndFormatPhone"
          >
            <option 
              v-for="country in countries" 
              :key="country.code" 
              :value="country.code"
            >
              {{ country.flag }} {{ country.code }} ({{ country.dialCode }})
            </option>
          </select>
        </div>
        <div class="col-span-2">
          <input
            type="tel"
            v-model="form.mobile.number"
            placeholder="Mobile number"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            :class="{ 'border-red-500': phoneError }"
            @input="validateAndFormatPhone"
          />
          <p v-if="phoneError" class="mt-1 text-sm text-red-500">{{ phoneError }}</p>
        </div>
      </div>
    </div>

  <!-- Submit Button -->
  <div class="flex justify-end space-x-4">
    <button
      type="button"
      @click="closeEditModal"
      class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
    >
      Cancel
    </button>
    <button
      type="submit"
      class="px-4 py-2 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-lg font-gilroy-bold hover:opacity-90 transition-all duration-200 ease-in-out hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Save Changes
    </button>
  </div>
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
import { 
  countries, 
  formatPhoneNumber, 
  validatePhoneNumberForCountry,
  findCountryByCode
} from '@/utils/countryData';

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
  national_insurance: string;
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

const showPensionModal = ref(false);
const editingPension = ref<PensionSubmission | null>(null);

// State
const showModal = ref(false);
const isLoading = ref(true);
const userProfile = ref<KycProfile | null>(null);
const pensions = ref<PensionSubmission[]>([]);
const userName = ref('User');
const phoneError = ref('');

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

const pensionForm = reactive({
  provider: '',
  policy_number: '',
  current_employer: true
});

// Methods
function validateAndFormatPhone() {
  const country = findCountryByCode(form.mobile.country);
  if (!country) {
    phoneError.value = 'Invalid country code';
    return false;
  }

  const formattedNumber = formatPhoneNumber(form.mobile.number, form.mobile.country);
  form.mobile.number = formattedNumber;

  const isValid = validatePhoneNumberForCountry(formattedNumber, form.mobile.country);
  if (!isValid) {
    phoneError.value = `Invalid phone number format for ${country.name}`;
    return false;
  }

  phoneError.value = '';
  return true;
}

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

// async function validateAndSubmit() {
//   if (!validateAndFormatPhone()) {
//     return;
//   }

//   // Validate other fields if needed
//   if (!form.dob.day || !form.dob.month || !form.dob.year) {
//     return; // Add appropriate error handling
//   }

//   await handleSubmit();
// }

async function handleSubmit() {
  if (!authStore.user?.id || !userProfile.value) return;

  try {
    const updatedProfile: KycProfile = {
      ...userProfile.value,
      dob_day: form.dob.day,
      dob_month: form.dob.month,
      dob_year: form.dob.year,
      gender: form.gender,
      mobile_country: form.mobile.country,
      mobile_number: form.mobile.number,
      postcode: form.postcode,
      national_insurance: userProfile.value.national_insurance || ''
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

function openPensionModal(pension: PensionSubmission) {
  editingPension.value = pension;
  pensionForm.provider = pension.provider;
  pensionForm.policy_number = pension.policy_number || '';
  pensionForm.current_employer = pension.current_employer;
  showPensionModal.value = true;
}

function closePensionModal() {
  showPensionModal.value = false;
  editingPension.value = null;
  // Reset form
  pensionForm.provider = '';
  pensionForm.policy_number = '';
  pensionForm.current_employer = true;
}

async function handlePensionSubmit() {
  if (!editingPension.value || !authStore.user?.id) return;

  try {
    // Assuming you have an update method in your pension store
    const updatedPension = {
      ...editingPension.value,
      provider: pensionForm.provider,
      policy_number: pensionForm.policy_number || null,
      current_employer: pensionForm.current_employer
    };

    // Update in store (you'll need to implement this method in your pensionStore)
    await pensionStore.updateSubmission(editingPension.value.id, updatedPension);
    
    // Update local state
    const index = pensions.value.findIndex(p => p.id === editingPension.value!.id);
    if (index !== -1) {
      pensions.value[index] = updatedPension;
    }
    
    closePensionModal();
  } catch (error) {
    console.error('Failed to update pension:', error);
    // You might want to show an error message to the user
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