<template>
  <section class="user-profile-page bg-gray-50">
    <!-- Banner Section -->
    <div
      class="banner w-full h-64 bg-cover bg-center relative"
      :style="bannerBackgroundStyle"
    >
      <div class="flex items-center justify-center h-full bg-black bg-opacity-40">
        <h1 class="text-4xl md:text-5xl font-gilroy-bold text-white">Your Profile</h1>
      </div>
    </div>

    <!-- Profile Section -->
    <div class="max-w-6xl mx-auto px-6 py-16">
      <!-- Personal Information -->
      <div class="profile-card bg-white shadow-lg rounded-lg p-8 mb-12">
        <h2 class="text-3xl font-gilroy-bold text-gray-800 mb-8">
          Welcome, {{ userName }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-gilroy-bold text-gray-700">Date of Birth</h3>
            <p class="text-gray-600 font-gilroy-light">
              {{ userProfile?.dob_day }}/{{ userProfile?.dob_month }}/{{ userProfile?.dob_year }}
            </p>
          </div>
          <div>
            <h3 class="text-lg font-gilroy-bold text-gray-700">Gender</h3>
            <p class="text-gray-600 font-gilroy-light">{{ userProfile?.gender }}</p>
          </div>
          <div>
            <h3 class="text-lg font-gilroy-bold text-gray-700">Mobile Number</h3>
            <p class="text-gray-600 font-gilroy-light">
              {{ userProfile?.mobile_country }} {{ userProfile?.mobile_number }}
            </p>
          </div>
          <div>
            <h3 class="text-lg font-gilroy-bold text-gray-700">Postcode</h3>
            <p class="text-gray-600 font-gilroy-light">{{ userProfile?.postcode }}</p>
          </div>
          <div>
            <h3 class="text-lg font-gilroy-bold text-gray-700">
              National Insurance Number
            </h3>
            <p class="text-gray-600 font-gilroy-light">
              {{ userProfile?.national_insurance || 'Not provided' }}
            </p>
          </div>
        </div>
        <div class="text-right mt-8">
          <button
            class="px-6 py-3 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-lg font-gilroy-bold hover:opacity-90 shadow-lg transition-transform hover:scale-105"
            @click="openEditModal"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <!-- Submitted Pensions -->
      <div class="pensions-card bg-white shadow-lg rounded-lg p-8">
        <h2 class="text-3xl font-gilroy-bold text-gray-800 mb-8">
          Submitted Pensions
        </h2>
        <div v-if="pensions.length > 0">
          <ul class="space-y-6">
            <li
              v-for="pension in pensions"
              :key="pension.id"
              class="border-b border-gray-300 pb-4 last:border-none"
            >
              <h3 class="text-lg font-gilroy-bold text-gray-700 mb-2">
                {{ pension.provider }}
              </h3>
              <p class="text-gray-600 font-gilroy-light">
                <strong>Policy Number:</strong> {{ pension.policy_number || 'N/A' }}
              </p>
              <p class="text-gray-600 font-gilroy-light">
                <strong>Current Employer:</strong> {{ pension.current_employer ? 'Yes' : 'No' }}
              </p>
              <p class="text-gray-600 font-gilroy-light">
                <strong>Submitted On:</strong> {{ new Date(pension.created_at).toLocaleDateString() }}
              </p>
            </li>
          </ul>
        </div>
        <div v-else class="text-gray-600 font-gilroy-light">
          No pensions submitted yet.
        </div>
        <div class="text-center mt-8">
          <router-link to="/add-pension">
            <button
              class="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg font-gilroy-bold hover:opacity-90 shadow-lg transition-transform hover:scale-105"
            >
              Add Another Pension
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="modal-content bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-xl">
        <h2 class="text-2xl font-gilroy-bold text-gray-800 mb-6">Edit Profile</h2>
        <form @submit.prevent="handleSaveProfile" class="space-y-6">
          <!-- Date of Birth -->
          <div>
            <label class="block text-gray-600 font-gilroy-light mb-2">Date of Birth</label>
            <div class="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="dd"
                v-model="form.dob.day"
                class="p-3 border border-gray-300 rounded-lg text-center"
                maxlength="2"
                required
              />
              <input
                type="text"
                placeholder="mm"
                v-model="form.dob.month"
                class="p-3 border border-gray-300 rounded-lg text-center"
                maxlength="2"
                required
              />
              <input
                type="text"
                placeholder="yyyy"
                v-model="form.dob.year"
                class="p-3 border border-gray-300 rounded-lg text-center"
                maxlength="4"
                required
              />
            </div>
          </div>

          <!-- Gender -->
          <div>
            <label class="block text-gray-600 font-gilroy-light mb-2">Gender</label>
            <div class="flex space-x-4">
              <button
                type="button"
                :class="form.gender === 'Male' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'"
                @click="form.gender = 'Male'"
                class="p-3 w-full rounded-lg border"
              >
                Male
              </button>
              <button
                type="button"
                :class="form.gender === 'Female' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'"
                @click="form.gender = 'Female'"
                class="p-3 w-full rounded-lg border"
              >
                Female
              </button>
            </div>
          </div>

          <!-- Mobile Number -->
          <div>
            <label class="block text-gray-600 font-gilroy-light mb-2">Mobile Number</label>
            <div class="flex space-x-2">
              <select v-model="form.mobile.country" class="w-1/3 p-3 border border-gray-300 rounded-lg">
                <option value="UK">UK (+44)</option>
                <option value="US">US (+1)</option>
                <option value="IN">IN (+91)</option>
              </select>
              <input
                type="tel"
                placeholder="7911 123 456"
                v-model="form.mobile.number"
                class="w-2/3 p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>

          <!-- Postcode -->
          <div>
            <label class="block text-gray-600 font-gilroy-light mb-2">Postcode</label>
            <input
              type="text"
              placeholder="e.g., SW1A 2AA"
              v-model="form.postcode"
              class="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <!-- Buttons -->
          <div class="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              class="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              @click="closeEditModal"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-lg font-gilroy-bold hover:opacity-90 shadow-lg transition-transform hover:scale-105"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>




<script setup>
import bannerImage from '@/assets/profile-banner.png';
import { ref, reactive, onMounted } from 'vue';
import { useKycProfileStore } from '@/stores/kycProfile';
import { usePensionSubmissionsStore } from '@/stores/pensionSubmissions';
import { useAuthStore } from '@/stores/auth';

const bannerBackgroundStyle = {
  backgroundImage: `url(${bannerImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const kycStore = useKycProfileStore();
const pensionStore = usePensionSubmissionsStore();
const authStore = useAuthStore();

const showModal = ref(false);
const userProfile = ref(null);
const pensions = ref([]);
const userName = ref('User');

// Form for editing profile
const form = reactive({
  dob: { day: '', month: '', year: '' },
  gender: '',
  mobile: { country: 'UK', number: '' },
  postcode: '',
});

// Fetch user profile and pensions on mount
onMounted(async () => {
  if (!authStore.isLoggedIn) {
    alert('You need to log in to access your profile.');
    return;
  }

  try {
    // Fetch user profile
    await kycStore.fetchKycProfile(authStore.user.id);
    userProfile.value = kycStore.kycProfile;
    userName.value = authStore.user.name || 'User';

    // Fetch pensions
    await pensionStore.fetchSubmissions(authStore.user.id);
    pensions.value = pensionStore.submissions;
  } catch (err) {
    console.error('Error fetching data:', err);
    alert('Failed to fetch profile or pensions. Please try again.');
  }
});

// Open modal to edit profile
const openEditModal = () => {
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
};

// Close modal
const closeEditModal = () => {
  showModal.value = false;
};

// Save updated profile
const handleSaveProfile = async () => {
  try {
    const updatedProfile = {
      dob_day: form.dob.day,
      dob_month: form.dob.month,
      dob_year: form.dob.year,
      gender: form.gender,
      mobile_country: form.mobile.country,
      mobile_number: form.mobile.number,
      postcode: form.postcode,
    };

    await kycStore.updateKycProfile(authStore.user.id, updatedProfile);
    userProfile.value = updatedProfile;
    closeEditModal();
    alert('Profile updated successfully.');
  } catch (err) {
    console.error('Failed to save profile:', err);
    alert('Failed to update profile. Please try again.');
  }
};
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
