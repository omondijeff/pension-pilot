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
      <div
        class="form-wrapper w-full md:w-1/2 h-full flex flex-col justify-center bg-white px-4 md:px-16"
      >
        <!-- Form Section -->
        <div class="form-section">
          <!-- Heading -->
          <h2 class="text-2xl font-gilroy-bold text-gray-800 text-center md:text-left">
            Reset Password
          </h2>
          <!-- Instructions -->
          <p class="text-gray-600 font-gilroy-light mt-2 text-center md:text-left">
            Please enter your new password below.
          </p>
  
          <!-- Error Message -->
          <div v-if="error" class="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-gilroy-light text-center">
            {{ error }}
          </div>
  
          <!-- Success Message -->
          <div v-if="successMessage" class="mt-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm font-gilroy-light text-center">
            {{ successMessage }}
          </div>
  
          <!-- Reset Password Form -->
          <form v-if="!invalidToken" @submit.prevent="handleResetPassword" class="space-y-4 mt-6">
            <!-- New Password Input -->
            <div>
              <label for="password" class="block text-sm text-gray-600 mb-2 font-gilroy-light">New Password</label>
              <input
                type="password"
                id="password"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter new password"
                v-model="password"
                required
                minlength="6"
                :disabled="loading"
              />
              <p class="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
            </div>
  
            <!-- Confirm Password Input -->
            <div>
              <label for="confirmPassword" class="block text-sm text-gray-600 mb-2 font-gilroy-light">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Confirm new password"
                v-model="confirmPassword"
                required
                minlength="6"
                :disabled="loading"
              />
            </div>
  
            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full py-3 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-lg font-gilroy-bold hover:opacity-90 disabled:opacity-50"
              :disabled="loading || !isValidForm"
            >
              {{ loading ? 'Updating Password...' : 'Update Password' }}
            </button>
          </form>
  
          <!-- Invalid Token Message -->
          <div v-if="invalidToken" class="mt-6 text-center">
            <p class="text-gray-600 mb-4">
              This password reset link has expired or is invalid.
            </p>
            <RouterLink 
              to="/forgot-password"
              class="inline-block py-2 px-4 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-lg font-gilroy-bold hover:opacity-90"
            >
              Request New Reset Link
            </RouterLink>
          </div>
  
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
  
  const password = ref('');
  const confirmPassword = ref('');
  const error = ref('');
  const loading = ref(false);
  const successMessage = ref('');
  const invalidToken = ref(false);
  const recoveryToken = ref('');
  
  // Computed property for form validation
  const isValidForm = computed(() => {
    return password.value.length >= 6 && 
           password.value === confirmPassword.value;
  });
  
  // Check if we have a valid session when the component mounts
  onMounted(async () => {
    console.log('Starting password reset flow...');
    
    try {
      // Check initial session state
      const initialSession = await supabase.auth.getSession();
      console.log('Initial session state:', initialSession.data.session ? 'Active' : 'None');
  
      // Get token and type from URL parameters
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      const type = params.get('type');
      
      console.log('URL Parameters:', { 
        type,
        tokenPresent: !!token,
        tokenLength: token?.length,
        tokenStart: token?.substring(0, 10)
      });
  
      if (!token || type !== 'recovery') {
        throw new Error('Invalid or missing token parameters');
      }
  
      // Store the recovery token
      recoveryToken.value = token;
      console.log('Recovery token stored');
  
      // Sign out any existing session
      console.log('Attempting to sign out existing session...');
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) {
        console.error('Error signing out:', signOutError);
      } else {
        console.log('Sign out successful');
      }
  
      // Verify session is cleared
      const afterSignOut = await supabase.auth.getSession();
      console.log('Session state after sign out:', afterSignOut.data.session ? 'Still Active' : 'Cleared');
  
      // Exchange the recovery token for a session
      console.log('Attempting to exchange token for session...');
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(token);
      
      if (exchangeError) {
        console.error('Token exchange error:', exchangeError);
        throw exchangeError;
      }
  
      // Verify new session
      const afterExchange = await supabase.auth.getSession();
      console.log('Session state after exchange:', afterExchange.data.session ? 'Active' : 'None');
      
      if (!afterExchange.data.session) {
        console.warn('No session created after token exchange');
      } else {
        console.log('Token exchange successful and session created');
      }
    } catch (err) {
      console.error('Error in session check:', err);
      invalidToken.value = true;
      error.value = err instanceof Error 
        ? err.message 
        : 'This password reset link has expired or is invalid. Please request a new one.';
    }
  });
  
  // Handle password reset
  const handleResetPassword = async () => {
    console.log('Starting password update process...');
    error.value = '';
    successMessage.value = '';
    
    if (!isValidForm.value) {
      error.value = password.value !== confirmPassword.value 
        ? 'Passwords do not match' 
        : 'Password must be at least 6 characters long';
      return;
    }
  
    loading.value = true;
  
    try {
      // Check for active session
      console.log('Checking for active session...');
      const { data: { session }, error: sessionError } = await supabase.auth.getSession() as { data: { session: any }, error: any };
      
      console.log('Session check result:', {
        hasSession: !!session,
        hasError: !!sessionError,
        errorMessage: sessionError?.message
      });
      
      if (sessionError) {
        console.error('Session check error:', sessionError);
        throw sessionError;
      }
  
      if (!session) {
        console.log('No active session found, attempting to recreate...');
        // Try to exchange the token for a session again if needed
        if (recoveryToken.value) {
          console.log('Attempting to exchange recovery token again...');
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(recoveryToken.value);
          if (exchangeError) {
            console.error('Error exchanging token:', exchangeError);
            throw exchangeError;
          }
          console.log('Token exchange successful');
          
          // Verify session was created
          const { data: { session: newSession }} = await supabase.auth.getSession();
          console.log('New session created:', !!newSession);
        } else {
          console.error('No recovery token available');
          throw new Error('No active session and no recovery token available');
        }
      }
  
      // Double check we have a session before updating password
      const { data: { session: finalSession }} = await supabase.auth.getSession();
      console.log('Final session check before password update:', !!finalSession);
  
      if (!finalSession) {
        throw new Error('Failed to establish session for password update');
      }
  
      // Update the user's password
      console.log('Attempting to update password...');
      const { error: updateError } = await supabase.auth.updateUser({
        password: password.value
      });
  
      if (updateError) {
        console.error('Password update error:', updateError);
        throw updateError;
      }
  
      console.log('Password updated successfully');
      successMessage.value = 'Password successfully updated!';
      
      // Wait a moment before redirecting
      setTimeout(() => {
        router.push({ 
          name: 'Login',
          query: { 
            message: 'Password successfully reset. Please log in with your new password.'
          }
        });
      }, 2000);
  
    } catch (err) {
      console.error('Error in password reset:', err);
      error.value = err instanceof Error 
        ? err.message 
        : 'Failed to update password. Please try again.';
    } finally {
      loading.value = false;
    }
  };
  </script>
  
  
  
  <style scoped>
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
  </style>