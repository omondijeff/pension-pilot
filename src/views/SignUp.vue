//src/views/SignupPage.vue
<template>
  <section class="signup-page min-h-screen flex flex-col md:flex-row">
    <!-- Left Column (Image) -->
    <div class="image-section w-full md:w-1/2">
      <img
        src="@/assets/register-page.png" 
        alt="Happy people"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Right Column (Form Wrapper) -->
    <div class="form-wrapper w-full md:w-1/2 flex flex-col justify-center bg-white px-4 md:px-16 py-8">
      <!-- Form Section -->
      <div class="form-section">
        <!-- Heading -->
        <h2 class="text-2xl font-gilroy-bold text-gray-800 text-center md:text-left">
          Check and combine your pensions
        </h2>

        <!-- Sign Up Form -->
        <form @submit.prevent="handleSignUp" class="space-y-4 mt-6">
          <!-- Name Input -->
          <div>
            <label for="name" class="block text-sm text-gray-600 mb-2 font-gilroy-light">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Full Name"
              v-model="name"
              required
              :disabled="isLoading"
            />
          </div>

          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm text-gray-600 mb-2 font-gilroy-light">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Email Address"
              v-model="email"
              required
              :disabled="isLoading"
            />
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm text-gray-600 mb-2 font-gilroy-light">
              Password
            </label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 pr-10"
                placeholder="Password"
                v-model="password"
                required
                :disabled="isLoading"
              />
              <div
                @click="togglePassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <EyeIcon v-if="!showPassword" class="h-5 w-5" />
                <EyeSlashIcon v-else class="h-5 w-5" />
              </div>
            </div>
          </div>

          <!-- Confirm Password Input -->
          <div>
            <label for="confirm-password" class="block text-sm text-gray-600 mb-2 font-gilroy-light">
              Confirm Password
            </label>
            <div class="relative">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirm-password"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 pr-10"
                placeholder="Confirm Password"
                v-model="confirmPassword"
                required
                :disabled="isLoading"
              />
              <div
                @click="toggleConfirmPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <EyeIcon v-if="!showConfirmPassword" class="h-5 w-5" />
                <EyeSlashIcon v-else class="h-5 w-5" />
              </div>
            </div>
          </div>

          <!-- Terms and Conditions Checkbox -->
          <div class="flex items-start space-x-2">
            <div class="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                v-model="acceptedTerms"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                :disabled="isLoading"
                required
              />
            </div>
            <label for="terms" class="text-sm text-gray-600 font-gilroy-light">
              I have read and agree to the 
              <a href="/terms-conditions" target="_blank" class="text-blue-600 hover:underline">Terms and Conditions</a>
            </label>
          </div>

          <!-- Notification Component -->
          <div class="notification-wrapper">
            <BaseNotification
              v-model:show="showNotification"
              :type="notificationType"
              :message="notificationMessage"
              :title="notificationTitle"
              :duration="5000"
              @dismiss="handleNotificationDismiss"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full py-3 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-lg font-gilroy-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="isLoading || !acceptedTerms"
          >
            <span v-if="isLoading">Creating your account...</span>
            <span v-else>Sign Up</span>
          </button>
        </form>

        <!-- Login Link -->
        <p class="text-center mt-4 text-gray-600 font-gilroy-light">
          Already have an account? 
          <a href="/login" class="text-blue-600 hover:underline">Log In</a>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid';
import BaseNotification from '@/components/BaseNotification.vue';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

// Form data
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const acceptedTerms = ref(false);

// UI state
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Notification state
const showNotification = ref(false);
const notificationType = ref<'success' | 'error' | 'warning' | 'info'>('error');
const notificationMessage = ref('');
const notificationTitle = ref('');

// Computed loading state
const isLoading = computed(() => authStore.loading);

// Password visibility toggles
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

// Notification helper
const showNotificationMessage = (
  type: 'success' | 'error' | 'warning' | 'info',
  title: string,
  message: string
) => {
  notificationType.value = type;
  notificationTitle.value = title;
  notificationMessage.value = message;
  showNotification.value = true;
};

const handleNotificationDismiss = () => {
  showNotification.value = false;
};

// Validate password strength
const isPasswordStrong = (pwd: string): boolean => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(pwd);
  const hasLowerCase = /[a-z]/.test(pwd);
  const hasNumbers = /\d/.test(pwd);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

  return (
    pwd.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar
  );
};

// Handle signup
const handleSignUp = async () => {
  try {
    // Reset any previous notifications
    showNotification.value = false;

    // Validate terms acceptance
    if (!acceptedTerms.value) {
      showNotificationMessage(
        'error',
        'Terms Not Accepted',
        'Please accept the terms and conditions to continue.'
      );
      return;
    }

    // Validate password match
    if (password.value !== confirmPassword.value) {
      showNotificationMessage(
        'error',
        'Password Mismatch',
        'The passwords you entered do not match. Please try again.'
      );
      return;
    }

    // Validate password strength
    if (!isPasswordStrong(password.value)) {
      showNotificationMessage(
        'error',
        'Weak Password',
        'Password must be at least 8 characters and contain uppercase, lowercase, numbers, and special characters.'
      );
      return;
    }

    // Attempt registration
    const success = await authStore.register(email.value, password.value, name.value);

    if (success) {
      showNotificationMessage(
        'success',
        'Registration Successful',
        'Please check your email to verify your account, then log in.'
      );
    } else {
      // Handle specific error cases
      switch (authStore.error) {
        case 'user_already_exists':
          showNotificationMessage(
            'error',
            'Account Exists',
            'An account with this email already exists. Please log in instead.'
          );
          setTimeout(() => {
            router.push('/login');
          }, 3000);
          break;

        case 'weak_password':
          showNotificationMessage(
            'error',
            'Weak Password',
            'Please choose a stronger password.'
          );
          break;

        default:
          showNotificationMessage(
            'error',
            'Registration Failed',
            authStore.error || 'An unexpected error occurred. Please try again.'
          );
      }
    }
  } catch (error) {
    showNotificationMessage(
      'error',
      'Registration Error',
      'An unexpected error occurred. Please try again later.'
    );
    console.error('Error during registration:', error);
  }
};

// Check for redirected email from login page
onMounted(() => {
  const redirectedEmail = localStorage.getItem('signup_email');
  if (redirectedEmail) {
    email.value = redirectedEmail;
    localStorage.removeItem('signup_email');
  }
});
</script>

<style scoped>
/* Main container */
.signup-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: white;
}

@media (min-width: 768px) {
  .signup-page {
    flex-direction: row;
  }
}

/* Image Section */
.image-section {
  width: 100%;
  min-height: 50vh;
  position: relative;
  overflow: hidden;
}

@media (min-width: 768px) {
  .image-section {
    width: 50%;
    height: 100vh;
    position: sticky;
    top: 0;
  }
}

.image-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Form Wrapper */
.form-wrapper {
  width: 100%;
  min-height: 50vh;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
}

@media (min-width: 768px) {
  .form-wrapper {
    width: 50%;
    min-height: 100vh;
    padding: 4rem;
  }
}

/* Form Section */
.form-section {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .form-section {
    margin-left: 74px;
  }
}

/* Notification wrapper */
.notification-wrapper {
  margin-bottom: 1rem;
}

/* Form Elements */
input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #4569ae;
  box-shadow: 0 0 0 2px rgba(69, 105, 174, 0.2);
}

button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Typography */
label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #4b5563;
}

h2 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
}

/* Links */
a {
  color: #4569ae;
  text-decoration: none;
  transition: text-decoration 0.3s ease;
}

a:hover {
  text-decoration: underline;
}
</style>