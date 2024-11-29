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
      <div
        class="form-wrapper w-full md:w-1/2 h-full flex flex-col justify-center bg-white px-4 md:px-16"
      >
        <!-- Form Section -->
        <div class="form-section">
          <!-- Heading -->
          <h2 class="text-2xl font-gilroy-bold text-gray-800 text-center md:text-left">
            Sign Up
          </h2>
          <!-- Sign Up Form -->
          <form @submit.prevent="handleSignUp" class="space-y-4 mt-6">
            <!-- Name Input -->
            <div>
              <label for="name" class="block text-sm text-gray-600 mb-2 font-gilroy-light">Full Name</label>
              <input
                type="text"
                id="name"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Full Name"
                v-model="name"
                required
              />
            </div>
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
            </div>
            <!-- Confirm Password Input -->
            <div>
              <label for="confirm-password" class="block text-sm text-gray-600 mb-2 font-gilroy-light">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Confirm Password"
                v-model="confirmPassword"
                required
              />
            </div>
            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full py-3 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-lg font-gilroy-bold hover:opacity-90"
            >
              Sign Up
            </button>
          </form>
          <!-- Login Link -->
          <p class="text-center mt-4 text-gray-600 font-gilroy-light">
            Already have an account? <a href="/login" class="text-blue-600 hover:underline">Log In</a>
          </p>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  /* Placeholder for handling sign up */
  const handleSignUp = () => {
    console.log("Sign Up attempt");
  };
  
  /* Form data */
  const name = '';
  const email = '';
  const password = '';
  const confirmPassword = '';
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
  
  button:hover {
    background: linear-gradient(to right, #3f9fd7, #4569ae);
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
  