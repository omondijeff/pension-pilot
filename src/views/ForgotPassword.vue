<template>
  <section class="reset-password-page flex flex-col md:flex-row h-screen">
    <!-- Left Column (Image) -->
    <div class="image-section w-full md:w-1/2 h-1/2 md:h-full">
      <img
        src="@/assets/register-page.png" 
        alt="Reset password illustration"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Right Column (Form Wrapper) -->
    <div class="form-wrapper w-full md:w-1/2 h-full flex flex-col justify-center bg-white px-4 md:px-16">
      <div class="form-section">
        <!-- Heading -->
        <h2 class="text-2xl font-gilroy-bold text-gray-800 text-center md:text-left">
          Reset Password
        </h2>

        <!-- Instructions -->
        <p class="text-gray-600 font-gilroy-light mt-2 text-center md:text-left">
          {{ !showResetForm 
            ? 'Enter your email to receive a reset code.' 
            : 'Enter the 6-digit code from your email and choose a new password.' }}
        </p>

        <!-- Error Message -->
        <div v-if="error" class="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-gilroy-light text-center">
          {{ error }}
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="mt-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm font-gilroy-light text-center">
          {{ successMessage }}
        </div>

        <!-- Email Form -->
        <form v-if="!showResetForm" @submit.prevent="handleSendResetCode" class="space-y-4 mt-6">
          <div>
            <label for="email" class="block text-sm text-gray-600 mb-2 font-gilroy-light">Email Address</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your email"
              required
              :disabled="loading"
            />
          </div>

          <button
            type="submit"
            class="w-full py-3 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-lg font-gilroy-bold hover:opacity-90 disabled:opacity-50"
            :disabled="loading || !email"
          >
            {{ loading ? 'Sending...' : 'Send Reset Code' }}
          </button>
        </form>

        <!-- Reset Form with OTP -->
        <form v-if="showResetForm" @submit.prevent="handlePasswordReset" class="space-y-4 mt-6">
          <div>
            <label for="otp" class="block text-sm text-gray-600 mb-2 font-gilroy-light">Reset Code</label>
            <input
              type="text"
              id="otp"
              v-model="otpCode"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter the 6-digit code"
              required
              :disabled="loading"
              maxlength="6"
              pattern="\d{6}"
            />
          </div>

          <div>
            <label for="password" class="block text-sm text-gray-600 mb-2 font-gilroy-light">New Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter new password"
              required
              minlength="6"
              :disabled="loading"
            />
            <p class="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm text-gray-600 mb-2 font-gilroy-light">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Confirm new password"
              required
              minlength="6"
              :disabled="loading"
            />
          </div>

          <div class="space-y-3">
            <button
              type="submit"
              class="w-full py-3 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-lg font-gilroy-bold hover:opacity-90 disabled:opacity-50"
              :disabled="loading || !isValidForm"
            >
              {{ loading ? 'Updating Password...' : 'Update Password' }}
            </button>

            <button
              type="button"
              class="w-full py-2 text-blue-600 hover:underline"
              @click="handleBack"
              :disabled="loading"
            >
              Back to Email Entry
            </button>
          </div>
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
import { ref, computed, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { supabase } from '@/lib/supabase';

const router = useRouter();

// Form states
const email = ref('');
const otpCode = ref('');
const password = ref('');
const confirmPassword = ref('');
const showResetForm = ref(false);
const loading = ref(false);
const error = ref('');
const successMessage = ref('');

// Form validation
const isValidForm = computed(() => {
  const isValidOtp = /^[0-9]{6}$/.test(otpCode.value);
  const isValidPassword = password.value.length >= 6;
  const passwordsMatch = password.value === confirmPassword.value;
  
  return isValidOtp && isValidPassword && passwordsMatch;
});

// Check session and redirect if needed
const checkSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    router.push('/profile');
    return true;
  }
  return false;
};

// Handle navigation after success
const handleSuccessNavigation = () => {
  successMessage.value = 'Password successfully updated!';
  
  setTimeout(() => {
    router.push({
      path: '/login',
      query: { 
        message: 'Password successfully reset. Please log in with your new password.'
      }
    });
  }, 2000);
};

// Initialize component
onMounted(async () => {
  // Check if user is already logged in
  const hasSession = await checkSession();
  if (hasSession) {
    router.push('/profile');
  }
});

// Send reset code
const handleSendResetCode = async () => {
  error.value = '';
  successMessage.value = '';
  loading.value = true;

  try {
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.value);

    if (resetError) throw resetError;

    successMessage.value = 'An email has been sent with your reset code.';
    showResetForm.value = true;
    
  } catch (err) {
    console.error('Error sending reset code:', err);
    error.value = err instanceof Error 
      ? err.message 
      : 'Failed to send reset code. Please try again.';
  } finally {
    loading.value = false;
  }
};

// Handle password reset with OTP
const handlePasswordReset = async () => {
  error.value = '';
  successMessage.value = '';
  loading.value = true;

  try {
    if (!email.value || !otpCode.value || !password.value) {
      throw new Error('Please fill in all fields');
    }

    if (password.value !== confirmPassword.value) {
      throw new Error('Passwords do not match');
    }

    // First verify the OTP
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email: email.value,
      token: otpCode.value,
      type: 'recovery'
    });

    if (verifyError) {
      throw verifyError;
    }

    // Then update the password
    const { error: updateError } = await supabase.auth.updateUser({
      password: password.value
    });

    if (updateError) {
      throw updateError;
    }

    handleSuccessNavigation();

  } catch (err) {
    console.error('Error resetting password:', err);
    error.value = err instanceof Error 
      ? err.message 
      : 'Failed to reset password. Please try again.';
  } finally {
    loading.value = false;
  }
};

// Handle back button
const handleBack = () => {
  showResetForm.value = false;
  otpCode.value = '';
  password.value = '';
  confirmPassword.value = '';
  error.value = '';
  successMessage.value = '';
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