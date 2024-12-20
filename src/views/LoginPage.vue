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
        <!-- Heading -->
        <h2 class="text-2xl font-gilroy-bold text-gray-800 text-center md:text-left">
          Log In
        </h2>
        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-4 mt-6">
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
          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm text-gray-600 mb-2 font-gilroy-light">Password</label>
            <input
              type="password"
              id="password"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Password"
              v-model="password"
              required
            />
            <a href="/forgot-password" class="text-sm text-blue-600 hover:underline mt-2 block">
              Forgot Password?
            </a>
          </div>
          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full py-3 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-lg font-gilroy-bold hover:opacity-90"
          >
            Log In
          </button>
        </form>
        <!-- Sign Up Link -->
        <p class="text-center mt-4 text-gray-600 font-gilroy-light">
          Don't have an account? <a href="/signup" class="text-blue-600 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { usePensionSubmissionsStore } from '@/stores/pensionSubmissions';
import { useKycProfileStore } from '@/stores/kycProfile'; // Import the KYC profile store

const router = useRouter();
const email = ref('');
const password = ref('');

// Access the stores
const authStore = useAuthStore();
const pensionStore = usePensionSubmissionsStore();
const kycStore = useKycProfileStore();

// Handle login
const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value);

    if (authStore.isLoggedIn) {
      console.log('Login successful!');

      // Fetch KYC profile
      await kycStore.fetchKycProfile(authStore.user.id);

      if (!kycStore.kycProfile) {
        console.warn('No KYC profile found. Redirecting to /about-you.');
        router.push('/about-you'); // Redirect if KYC profile is missing
        return;
      }

      // Fetch pension submissions
      await pensionStore.fetchSubmissions(authStore.user.id);

      // Redirect based on submissions
      if (pensionStore.submissions.length > 0) {
        router.push('/profile'); // Redirect to profile if pensions exist
      } else {
        router.push('/add-pension'); // Redirect to add-pension if no submissions
      }
    } else {
      console.error('Login failed', authStore.error);
    }
  } catch (error) {
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
  transition: background 0.3s;
}

button:hover {
  background: linear-gradient(to right, #3f9fd7, #4569ae);
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
