//src/views/SignupPage.vue
<template>
  <section class="signup-page flex flex-col md:flex-row h-screen">
    <!-- Left Column (Image) -->
    <div class="image-section w-full md:w-1/2 h-1/2 md:h-full">
      <img
        src="@/assets/register-page.png" 
        alt="Happy people"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Right Column (Form Wrapper) -->
    <div class="form-wrapper w-full md:w-1/2 h-full flex flex-col justify-center bg-white px-4 md:px-16">
      <!-- Form Section -->
      <div class="form-section">
        <!-- Notification Component -->
        <BaseNotification
          v-model:show="showNotification"
          :type="notificationType"
          :message="notificationMessage"
          :title="notificationTitle"
          :duration="5000"
          @dismiss="handleNotificationDismiss"
        />

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

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full py-3 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-lg font-gilroy-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="isLoading"
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
/* Ensure proper layout for both mobile and desktop */
.signup-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

@media (min-width: 768px) {
  .signup-page {
    flex-direction: row;
  }
}

/* Image Section */
.image-section {
  width: 100%;
  height: 50%;
}

@media (min-width: 768px) {
  .image-section {
    width: 50%;
    height: 100%;
  }
}

/* Form Wrapper */
.form-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  background-color: white;
}

@media (min-width: 768px) {
  .form-wrapper {
    width: 50%;
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
    margin-left: 74px; /* Add left margin of 74px */
  }
}

/* Heading */
h2 {
  font-size: 1.75rem;
  font-weight: bold;
  color: #333;
}

/* Form Styling */
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-size: 0.875rem;
  color: #555;
  margin-bottom: 0.5rem;
}

input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #4569ae;
  box-shadow: 0 0 0 2px rgba(69, 105, 174, 0.2);
}

/* Submit Button */
button {
  padding: 0.75rem;
  background: linear-gradient(to right, #4569ae, #3f9fd7);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover:not(:disabled) {
  background: linear-gradient(to right, #3f9fd7, #4569ae);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Login Link */
p {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #555;
}

p a {
  color: #4569ae;
  text-decoration: none;
}

p a:hover {
  text-decoration: underline;
}
</style>