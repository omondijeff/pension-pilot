//src/views/LoginPage.vue
<template>
  <section class="login-page flex flex-col md:flex-row h-screen">
    <!-- Left Column (Image) -->
    <div class="image-section w-full md:w-1/2 h-1/2 md:h-full">
      <img
        src="@/assets/login-page.png"
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
          Log In
        </h2>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-4 mt-6">
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
              />
              <div
                @click="togglePassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <EyeIcon v-if="!showPassword" class="h-5 w-5" />
                <EyeSlashIcon v-else class="h-5 w-5" />
              </div>
            </div>
            <a 
              href="/forgot-password" 
              class="text-sm text-blue-600 hover:underline mt-2 block"
            >
              Forgot Password?
            </a>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full py-3 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-lg font-gilroy-bold hover:opacity-90"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Logging in...</span>
            <span v-else>Log In</span>
          </button>
        </form>

        <!-- Sign Up Link -->
        <p class="text-center mt-4 text-gray-600 font-gilroy-light">
          Don't have an account? 
          <a href="/signup" class="text-blue-600 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid';
import BaseNotification from '@/components/BaseNotification.vue';
import { useAuthStore } from '@/stores/auth';
import { usePensionSubmissionsStore } from '@/stores/pensionSubmissions';
import { useKycProfileStore } from '@/stores/kycProfile';

const router = useRouter();
const email = ref('');
const password = ref('');
const showPassword = ref(false);
// Use the loading state from the auth store
const isLoading = computed(() => authStore.loading);

// Notification state
const showNotification = ref(false);
const notificationType = ref<'success' | 'error' | 'warning' | 'info'>('error');
const notificationMessage = ref('');
const notificationTitle = ref('');

// Store instances
const authStore = useAuthStore();
const pensionStore = usePensionSubmissionsStore();
const kycStore = useKycProfileStore();

// Toggle password visibility
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// Handle notification dismiss
const handleNotificationDismiss = () => {
  showNotification.value = false;
};

// Show notification helper
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

// Handle login
const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value);

    if (authStore.isLoggedIn) {
      showNotificationMessage('success', 'Welcome back!', 'Successfully logged in.');

      // Fetch KYC profile
      await kycStore.fetchKycProfile(authStore.user.id);

      if (!kycStore.kycProfile) {
        showNotificationMessage(
          'info',
          'Profile Setup Required',
          'Please complete your profile information.'
        );
        router.push('/about-you');
        return;
      }

      // Fetch pension submissions
      await pensionStore.fetchSubmissions(authStore.user.id);

      // Redirect based on submissions
      if (pensionStore.submissions.length > 0) {
        router.push('/profile');
      } else {
        router.push('/add-pension');
      }
    } else {
      // Handle specific error cases
      switch (authStore.error) {
        case 'user_not_found':
          showNotificationMessage(
            'info',
            'Account Not Found',
            'No account found with this email. Redirecting you to sign up...'
          );
          
          // Save the email for the signup form
          localStorage.setItem('signup_email', email.value);
          
          setTimeout(() => {
            router.push('/signup');
          }, 3000);
          break;

        case 'invalid_password':
          showNotificationMessage(
            'error',
            'Invalid Password',
            'Please check your password and try again.'
          );
          break;

        default:
          showNotificationMessage(
            'error',
            'Login Failed',
            'An unexpected error occurred. Please try again.'
          );
      }
    }
  } catch (error) {
    showNotificationMessage(
      'error',
      'Login Error',
      'An error occurred during login. Please try again later.'
    );
    console.error('Error during login:', error);
  }
};
</script>

<style scoped>
/* Ensure proper layout for both mobile and desktop */
.login-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

@media (min-width: 768px) {
  .login-page {
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
    margin-left: 74px;
  }
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

/* Forgot Password */
a {
  font-size: 0.875rem;
  color: #4569ae;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
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
  transition: opacity 0.3s;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Sign Up Section */
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