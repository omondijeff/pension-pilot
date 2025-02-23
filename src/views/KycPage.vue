//src/views/KycPage.vue
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
            Date of birth *
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
            Gender *
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
            <button
              type="button"
              :class="form.gender === 'Prefer Not To Say' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'"
              @click="form.gender = 'Prefer Not To Say'"
              class="p-3 w-full rounded-lg border"
            >
              Prefer Not To Say
            </button>
            
          </div>
          <p v-if="formErrors.gender" class="text-red-500 text-sm mt-1">
            {{ formErrors.gender }}
          </p>
        </div>

        <!-- Mobile Number -->
        <div>
          <label class="block text-gray-600 font-gilroy-light mb-2">
            Mobile Number *
          </label>
          <div class="flex space-x-2">
            <select
              v-model="form.mobile.country"
              class="w-2/5 p-3 border border-gray-300 rounded-lg"
              required
            >
              <option 
                v-for="country in countries" 
                :key="country.code" 
                :value="country.code"
              >
                {{ country.flag }} {{ country.code }} ({{ country.dialCode }})
              </option>
            </select>
            <input
              type="tel"
              :placeholder="getPhoneNumberPlaceholder(form.mobile.country)"
              v-model="form.mobile.number"
              @input="validateMobileNumber"
              class="w-3/5 p-3 border border-gray-300 rounded-lg"
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
            National Insurance Number *
          </label>
          <input
            type="text"
            placeholder="QQ 12 34 56 B"
            v-model="form.nationalInsurance"
            @input="formatNationalInsurance"
            class="w-full p-3 border border-gray-300 rounded-lg uppercase"
            required
          />
          <p v-if="formErrors.nationalInsurance" class="text-red-500 text-sm mt-1">
            {{ formErrors.nationalInsurance }}
          </p>
          <p class="text-sm text-gray-500 font-gilroy-light mt-1">
            Make sure this information is accurate, as it's required to access
            your PensionPilot Pension. You can find your National Insurance (NI)
            number on your P60, payslip, tax return, or by contacting HMRC. 
            <a href="https://www.gov.uk/national-insurance/your-national-insurance-number" target="_blank" class="text-blue-500 hover:underline">HMRC's free tool</a>
          </p>
        </div>

    

        <!-- Next Button -->
        <button
          type="submit"
          class="w-full bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white p-3 rounded-lg font-gilroy-bold hover:opacity-90 shadow-lg transition-transform hover:scale-105"
          :disabled="!isFormValid || loading"
        >
          {{ loading ? 'Saving...' : 'Next' }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useKycProfileStore } from '@/stores/kycProfile';
import { useAuthStore } from '@/stores/auth';
import { usePensionSubmissionsStore } from '@/stores/pensionSubmissions';
import { useRouter } from 'vue-router';
import { 
  countries, 
  formatPhoneNumber, 
  validatePhoneNumberForCountry,
  findCountryByCode
} from '@/utils/countryData';

const kycStore = useKycProfileStore();
const authStore = useAuthStore();
const pensionStore = usePensionSubmissionsStore();
const router = useRouter();

// Loading and error states
const loading = ref(false);
const error = ref(null);

// Form data
const form = reactive({
  dob: { day: '', month: '', year: '' },
  gender: '',
  mobile: { country: 'GB', number: '' },
  nationalInsurance: ''
});

// Form errors
const formErrors = reactive({
  dob: '',
  gender: '',
  mobile: '',
  nationalInsurance: ''
});

// Watch for mobile number changes to trigger validation
watch(() => form.mobile.number, (newValue) => {
  if (newValue) {
    validateMobileNumber();
  }
});

// Get placeholder based on country
const getPhoneNumberPlaceholder = (countryCode) => {
  switch (countryCode) {
    case 'GB': return '7911 123456';
    case 'US': return '(555) 123-4567';
    case 'IN': return '99999 99999';
    default: return '123 456 7890';
  }
};

// Validation methods
const validateNumericInput = (event, maxLength) => {
  event.target.value = event.target.value.replace(/[^0-9]/g, '');
  if (event.target.value.length > maxLength) {
    event.target.value = event.target.value.slice(0, maxLength);
  }
};

// Add DOB validation
watch(
  () => form.dob,
  () => {
    const day = parseInt(form.dob.day);
    const month = parseInt(form.dob.month);
    const year = parseInt(form.dob.year);

    if (day && month && year) {
      // Basic date validation
      const date = new Date(year, month - 1, day);
      const isValid = date.getDate() === day && 
                     date.getMonth() === month - 1 && 
                     date.getFullYear() === year &&
                     year >= 1900 && 
                     year <= new Date().getFullYear();

      formErrors.dob = isValid ? '' : 'Please enter a valid date';
    } else {
      formErrors.dob = '';
    }
  },
  { deep: true }
);

const validateMobileNumber = () => {
  try {
    const isValid = validatePhoneNumberForCountry(form.mobile.number, form.mobile.country);
    formErrors.mobile = isValid ? '' : 'Invalid mobile number';
    if (isValid) {
      // Format the number according to country format
      form.mobile.number = formatPhoneNumber(form.mobile.number, form.mobile.country);
    }
  } catch (err) {
    formErrors.mobile = 'Invalid mobile number';
  }
};

// Format National Insurance number as user types
const formatNationalInsurance = (event) => {
  let value = event.target.value.toUpperCase();
  
  // Remove all spaces and non-alphanumeric characters
  value = value.replace(/[^A-Z0-9]/g, '');
  
  // Format the number with spaces
  if (value.length > 0) {
    let formatted = '';
    for (let i = 0; i < value.length && i < 9; i++) {
      if (i === 2 || i === 4 || i === 6 || i === 8) {
        formatted += ' ';
      }
      formatted += value[i];
    }
    form.nationalInsurance = formatted.trim();
  } else {
    form.nationalInsurance = value;
  }

  // Validate the format
  const niRegex = /^[A-Z]{2} \d{2} \d{2} \d{2} [A-Z]$/;
  if (!niRegex.test(form.nationalInsurance)) {
    formErrors.nationalInsurance = 'Invalid National Insurance number format';
  } else {
    formErrors.nationalInsurance = '';
  }
};

// Form validation
const isFormValid = computed(() => {
  const dobValid = form.dob.day && form.dob.month && form.dob.year;
  const niValid = form.nationalInsurance.replace(/\s+/g, ' ').trim().match(/^[A-Z]{2} \d{2} \d{2} \d{2} [A-Z]$/);
  
  // Add debug information
  const validations = {
    dobValid,
    hasGender: Boolean(form.gender),
    hasMobileNumber: Boolean(form.mobile.number),
    niValid: Boolean(niValid),
    noDobError: !formErrors.dob,
    noGenderError: !formErrors.gender,
    noMobileError: !formErrors.mobile,
    noNiError: !formErrors.nationalInsurance
  };

  console.log('Form validations:', validations);
  
  return Object.values(validations).every(Boolean);
});

// Form submission handler
const handleNextStep = async () => {
  error.value = null;

  if (isFormValid.value) {
    try {
      loading.value = true;

      if (!authStore.user?.id) {
        throw new Error('User not authenticated');
      }

      // Get the country data for storing the dial code
      const country = findCountryByCode(form.mobile.country);

      const kycData = {
        id: '',
        user_id: authStore.user.id,
        dob_day: form.dob.day,
        dob_month: form.dob.month,
        dob_year: form.dob.year,
        gender: form.gender,
        mobile_country: form.mobile.country,
        mobile_number: form.mobile.number,
        mobile_dial_code: country.dialCode,
        national_insurance: form.nationalInsurance.replace(/\s/g, ''),
      };

      await kycStore.updateKycProfile(kycData.user_id, kycData);
      await pensionStore.fetchSubmissions(authStore.user.id);

      if (pensionStore.submissions.length === 0) {
        router.push('/add-pension');
      } else {
        router.push('/profile');
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to save profile';
      console.error('Profile save error:', error.value);
    } finally {
      loading.value = false;
    }
  }
};

// Initialize form with existing data
onMounted(async () => {
  if (!authStore.isLoggedIn) {
    router.push('/login');
    return;
  }

  try {
    await kycStore.fetchKycProfile(authStore.user.id);

    const existingProfile = kycStore.kycProfile;
    if (existingProfile) {
      form.dob.day = existingProfile.dob_day;
      form.dob.month = existingProfile.dob_month;
      form.dob.year = existingProfile.dob_year;
      form.gender = existingProfile.gender;
      form.mobile.country = existingProfile.mobile_country;
      form.mobile.number = existingProfile.mobile_number;
      
      // Format the National Insurance number when populating
      if (existingProfile.national_insurance) {
        const ni = existingProfile.national_insurance;
        form.nationalInsurance = `${ni.slice(0,2)} ${ni.slice(2,4)} ${ni.slice(4,6)} ${ni.slice(6,8)} ${ni.slice(8)}`;
      }
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

/* Input styling */
input, select {
  transition: border-color 0.2s ease;
}

input:focus, select:focus {
  border-color: #4569AE;
  outline: none;
  box-shadow: 0 0 0 2px rgba(69, 105, 174, 0.2);
}

/* Button hover effect */
button:not(:disabled):hover {
  transform: translateY(-1px);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}
</style>