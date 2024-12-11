<template>
  <section class="kyc-page bg-white">
    <!-- Banner Section -->
    <div class="banner w-full h-48 md:h-64">
      <img
        src="@/assets/kyc-banner.png" 
        alt="About You"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Form Section -->
    <div class="form-section max-w-xl mx-auto mt-8 px-4">
      <!-- Title -->
      <h1 class="text-3xl font-gilroy-bold text-center text-gray-800">
        About You
      </h1>
      <p class="text-center text-gray-600 font-gilroy-light mt-2">
        Please provide a few details to help us confirm your identity
      </p>

      <!-- Error Handling -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        {{ error }}
      </div>

      <!-- KYC Form -->
      <form @submit.prevent="handleNextStep" class="space-y-6 mt-6">
        <!-- Date of Birth -->
        <div>
          <label class="block text-gray-600 font-gilroy-light mb-2">
            Date of birth
          </label>
          <div class="flex space-x-2">
            <input
              type="text"
              placeholder="dd"
              v-model="form.dob.day"
              @input="validateNumericInput($event, 2)"
              class="w-1/3 p-3 border border-gray-300 rounded-lg text-center"
              maxlength="2"
              required
            />
            <input
              type="text"
              placeholder="mm"
              v-model="form.dob.month"
              @input="validateNumericInput($event, 2)"
              class="w-1/3 p-3 border border-gray-300 rounded-lg text-center"
              maxlength="2"
              required
            />
            <input
              type="text"
              placeholder="yyyy"
              v-model="form.dob.year"
              @input="validateNumericInput($event, 4)"
              class="w-1/3 p-3 border border-gray-300 rounded-lg text-center"
              maxlength="4"
              required
            />
          </div>
          <p v-if="formErrors.dob" class="text-red-500 text-sm mt-1">
            {{ formErrors.dob }}
          </p>
        </div>

        <!-- Gender -->
        <div>
          <label class="block text-gray-600 font-gilroy-light mb-2">
            Gender
          </label>
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
          <p v-if="formErrors.gender" class="text-red-500 text-sm mt-1">
            {{ formErrors.gender }}
          </p>
        </div>

        <!-- Mobile Number -->
        <div>
          <label class="block text-gray-600 font-gilroy-light mb-2">
            Mobile Number
          </label>
          <div class="flex space-x-2">
            <select
              v-model="form.mobile.country"
              class="w-1/3 p-3 border border-gray-300 rounded-lg"
            >
              <option value="UK">UK (+44)</option>
              <option value="US">US (+1)</option>
              <option value="IN">IN (+91)</option>
            </select>
            <input
              type="tel"
              placeholder="7911 123 456"
              v-model="form.mobile.number"
              @input="validateMobileNumber"
              class="w-2/3 p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <p v-if="formErrors.mobile" class="text-red-500 text-sm mt-1">
            {{ formErrors.mobile }}
          </p>
        </div>

        <!-- National Insurance Number -->
        <div>
          <label class="block text-gray-600 font-gilroy-light mb-2">
            National Insurance Number
          </label>
          <input
            type="text"
            placeholder="QQ123456B"
            v-model="form.nationalInsurance"
            class="w-full p-3 border border-gray-300 rounded-lg"
          />
          <p class="text-sm text-gray-500 font-gilroy-light mt-1">
            Make sure this information is accurate, as it's required to access
            your PensionPilot Pension. You can find your National Insurance (NI)
            number on your P60, payslip, tax return, or by contacting HMRC. 
            <a href="https://www.gov.uk/national-insurance/your-national-insurance-number" target="_blank" class="text-blue-500 hover:underline">HMRC's free tool</a>
          </p>
        </div>

        <!-- Postcode -->
        <div>
          <label class="block text-gray-600 font-gilroy-light mb-2">
            Postcode
          </label>
          <div class="flex space-x-2">
            <input
              type="text"
              placeholder="e.g., SW1A 2AA"
              v-model="form.postcode"
              @input="validatePostcode"
              class="w-2/3 p-3 border border-gray-300 rounded-lg"
              required
            />
            <button
              type="button"
              class="w-1/3 bg-blue-500 text-white p-3 rounded-lg"
              @click="findAddress"
              :disabled="!isPostcodeValid"
            >
              Find Address
            </button>
          </div>
          <p v-if="formErrors.postcode" class="text-red-500 text-sm mt-1">
            {{ formErrors.postcode }}
          </p>
        </div>

        <!-- Next Button -->
        <button
          type="submit"
          class="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-3 rounded-lg font-gilroy-bold"
          :disabled="!isFormValid || loading"
        >
          {{ loading ? 'Saving...' : 'Next' }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useKycProfileStore } from '@/stores/kycProfile';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const kycStore = useKycProfileStore();
const authStore = useAuthStore();
const router = useRouter();

// Loading, error, and form states
const loading = ref(false);
const error = ref(null);

// Reactive form data
const form = reactive({
  dob: { day: '', month: '', year: '' },
  gender: '',
  mobile: { country: 'UK', number: '' },
  nationalInsurance: '',
  postcode: ''
});

// Form validation errors
const formErrors = reactive({
  dob: '',
  gender: '',
  mobile: '',
  postcode: ''
});

// Validation methods
const validateNumericInput = (event, maxLength) => {
  event.target.value = event.target.value.replace(/[^0-9]/g, '');
  if (event.target.value.length > maxLength) {
    event.target.value = event.target.value.slice(0, maxLength);
  }
};

const validateMobileNumber = () => {
  const mobileRegex = /^[0-9\s]+$/;
  if (!form.mobile.number || !mobileRegex.test(form.mobile.number)) {
    formErrors.mobile = 'Invalid mobile number';
  } else {
    formErrors.mobile = '';
  }
};

const validatePostcode = () => {
  const postcodeRegex = /^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}$/i;
  if (!form.postcode || !postcodeRegex.test(form.postcode)) {
    formErrors.postcode = 'Invalid postcode';
  } else {
    formErrors.postcode = '';
  }
};

// Computed properties for validation
const isPostcodeValid = computed(() => {
  return !formErrors.postcode && form.postcode.trim() !== '';
});

const isFormValid = computed(() => {
  return (
    form.dob.day && form.dob.month && form.dob.year &&
    form.gender &&
    form.mobile.number &&
    form.postcode &&
    !formErrors.dob &&
    !formErrors.gender &&
    !formErrors.mobile &&
    !formErrors.postcode
  );
});

// Address finder method
const findAddress = () => {
  if (isPostcodeValid.value) {
    // Implement address lookup logic here
    console.log("Finding address for postcode:", form.postcode);
  }
};

// Form submission handler
const handleNextStep = async () => {
  // Reset previous errors
  error.value = null;

  // Validate all fields before submission
  validateMobileNumber();
  validatePostcode();

  if (isFormValid.value) {
    try {
      loading.value = true;

      // Ensure we have a user
      if (!authStore.user?.id) {
        throw new Error('User not authenticated');
      }

      // Prepare data for store update
      const kycData = {
        id: '', // This will be automatically handled by Supabase
        user_id: authStore.user.id,
        dob_day: form.dob.day,
        dob_month: form.dob.month,
        dob_year: form.dob.year,
        gender: form.gender,
        mobile_country: form.mobile.country,
        mobile_number: form.mobile.number,
        national_insurance: form.nationalInsurance,
        postcode: form.postcode
      };

      // Call store method to update KYC profile
      await kycStore.updateKycProfile(kycData.user_id, kycData);

      // Navigate to next step or dashboard
      router.push('/dashboard'); // Adjust route as needed
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to save KYC profile';
      console.error('KYC profile save error:', error.value);
    } finally {
      loading.value = false;
    }
  } else {
    console.log("Form is invalid.");
  }
};

// Fetch and populate existing profile data when component mounts
onMounted(async () => {
  // Redirect if user is not authenticated
  if (!authStore.isLoggedIn) {
    router.push('/login');
    return;
  }

  try {
    // Fetch existing KYC profile
    await kycStore.fetchKycProfile(authStore.user.id);
    
    // Populate form with existing data if available
    const existingProfile = kycStore.kycProfile;
    if (existingProfile) {
      form.dob.day = existingProfile.dob_day;
      form.dob.month = existingProfile.dob_month;
      form.dob.year = existingProfile.dob_year;
      form.gender = existingProfile.gender;
      form.mobile.country = existingProfile.mobile_country;
      form.mobile.number = existingProfile.mobile_number;
      form.nationalInsurance = existingProfile.national_insurance;
      form.postcode = existingProfile.postcode;
    }
  } catch (err) {
    error.value = 'Failed to load existing profile';
  }
});
</script>

<style scoped>
/* Banner Section */
.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Form Section */
.form-section {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
}
</style>