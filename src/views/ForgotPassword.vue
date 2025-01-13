<template>
  <section class="forgot-password-page flex flex-col md:flex-row h-screen">
    <!-- Left Column (Image) -->
    <div class="image-section w-full md:w-1/2 h-1/2 md:h-full">
      <img
        src="@/assets/register-page.png" 
        alt="Reset password illustration"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Right Column (Form Wrapper) -->
    <div
      class="form-wrapper w-full md:w-1/2 h-full flex flex-col justify-center bg-white px-4 md:px-16"
    >
      <!-- Form Section -->
      <div class="form-section">
        <!-- Heading -->
        <h2 class="text-2xl font-gilroy-bold text-gray-800 text-center md:text-left">
          Forgot Password
        </h2>
        <!-- Instructions -->
        <p class="text-gray-600 font-gilroy-light mt-2 text-center md:text-left">
          Enter your email address below, and we'll send you a link to reset your password.
        </p>

          <!-- Success Message with Enhanced Instructions -->
    <div v-if="successMessage" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
      <p class="text-green-600 font-gilroy-medium mb-2">{{ successMessage }}</p>
      <ul class="text-sm text-green-700 font-gilroy-light list-disc pl-4 space-y-1">
        <li>Check your email for the password reset link</li>
        <li>Click the link to set a new password</li>
        <li>The link will expire in 24 hours</li>
      </ul>
    </div>

        <!-- Error Message -->
        <div v-if="error" class="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-gilroy-light text-center">
          {{ error }}
        </div>

        <!-- Forgot Password Form -->
        <form @submit.prevent="handleForgotPassword" class="space-y-4 mt-6">
          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm text-gray-600 mb-2 font-gilroy-light">Email Address</label>
            <input
              type="email"
              id="email"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Email Address"
              v-model="email"
              required
            />
          </div>
          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full py-3 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-lg font-gilroy-bold hover:opacity-90 disabled:opacity-50"
            :disabled="loading"
          >
            {{ loading ? 'Sending Reset Link...' : 'Send Reset Link' }}
          </button>
        </form>
        <!-- Back to Login Link -->
        <p class="text-center mt-4 text-gray-600 font-gilroy-light">
          Remember your password? <RouterLink to="/login" class="text-blue-600 hover:underline">Log In</RouterLink>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { supabase } from '@/lib/supabase';

const authStore = useAuthStore();

const email = ref<string>(''); // Explicitly type the ref as string
const error = ref<string>('');
const loading = ref(false);
const successMessage = ref<string>('');

// Set up auth state change listener
onMounted(() => {
  console.log('Setting up auth state change listener');
  let subscription: any;
  
  try {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', event, session ? 'Session exists' : 'No session');
      
      if (event === 'PASSWORD_RECOVERY') {
        console.log('Password recovery event detected');
        window.location.href = '/reset-password';
      }
    });
    
    subscription = data.subscription;
  } catch (err) {
    console.error('Error setting up auth listener:', err);
  }

  // Cleanup subscription on component unmount
  onUnmounted(() => {
    if (subscription) {
      console.log('Cleaning up auth state subscription');
      try {
        subscription.unsubscribe();
      } catch (err) {
        console.error('Error unsubscribing:', err);
      }
    }
  });
});

const handleForgotPassword = async () => {
  if (!email.value) {
    error.value = 'Please enter your email address';
    return;
  }

  console.log('Starting forgot password flow for:', email.value);
  
  error.value = '';
  successMessage.value = '';
  loading.value = true;
  
  try {
    const success = await authStore.forgotPassword(email.value);
    console.log('Forgot password result:', success);
    
    if (success) {
      successMessage.value = 'Password reset link sent!';
      email.value = ''; // Clear the form
    } else {
      error.value = getErrorMessage(authStore.error);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    error.value = 'An unexpected error occurred. Please try again.';
  } finally {
    loading.value = false;
  }
};

const getErrorMessage = (errorCode: string | null): string => {
  console.log('Getting error message for:', errorCode);
  
  switch (errorCode) {
    case 'user_not_found':
      return 'No account found with this email address.';
    case 'rate_limit_exceeded':
      return 'Too many attempts. Please try again later.';
    case 'email_not_verified':
      return 'Please verify your email address first.';
    default:
      return authStore.error || 'Failed to send reset link. Please try again.';
  }
};
</script>
<style scoped>
/* Keep your existing styles */
.forgot-password-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

@media (min-width: 768px) {
  .forgot-password-page {
    flex-direction: row;
  }
}

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

/* Form elements styling */
input:focus {
  border-color: #4569ae;
  box-shadow: 0 0 0 2px rgba(69, 105, 174, 0.2);
}

button:disabled {
  cursor: not-allowed;
}
</style>