<template>
    <section class="login-page flex h-screen">
      <!-- Left Column (Image) -->
      <div class="image-section w-full md:w-1/2 h-full">
        <img
          src="@/assets/login-page.png"
          alt="Happy people"
          class="w-full h-full object-cover"
        />
      </div>
  
      <!-- Right Column (Form Wrapper) -->
      <div
        class="form-wrapper w-full md:w-1/2 h-full flex flex-col justify-center bg-white px-8"
        style="margin-left: 74px;"
      >
        <!-- Form Section -->
        <div class="form-section max-w-sm w-full">
          <!-- Heading -->
          <h2 class="text-2xl font-bold text-gray-800">
            Log In
          </h2>
          <!-- Login Form -->
          <form @submit.prevent="handleLogin" class="space-y-4 mt-6">
            <!-- Email Input -->
            <div>
              <label for="email" class="block text-sm text-gray-600 mb-2">Email Address</label>
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
              <label for="password" class="block text-sm text-gray-600 mb-2">Password</label>
              <input
                type="password"
                id="password"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Password"
                v-model="password"
                required
              />
              <a href="#" class="text-sm text-blue-600 hover:underline mt-2 block">
                Forgot Password?
              </a>
            </div>
            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full py-3 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-lg font-medium hover:opacity-90"
            >
              Log In
            </button>
          </form>
          <!-- Sign Up Link -->
          <p class="text-center mt-4 text-gray-600">
            OR <a href="#" class="text-blue-600 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  /* Placeholder for handling login */
  const handleLogin = () => {
    console.log("Log In attempt");
  };
  </script>
  
  <style scoped>
  /* Form Wrapper ensures entire content has a margin of 74px */
  .form-wrapper {
    margin-left: 74px;
  }
  </style>
  