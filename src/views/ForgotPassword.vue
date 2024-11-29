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
              class="w-full py-3 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-lg font-gilroy-bold hover:opacity-90"
            >
              Send Reset Link
            </button>
          </form>
          <!-- Back to Login Link -->
          <p class="text-center mt-4 text-gray-600 font-gilroy-light">
            Remember your password? <a href="/login" class="text-blue-600 hover:underline">Log In</a>
          </p>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  /* Placeholder for handling password reset */
  const handleForgotPassword = () => {
    console.log("Password reset link requested for:", email);
  };
  
  /* Form data */
  const email = '';
  </script>
  
  <style scoped>
  /* Ensure proper layout for both mobile and desktop */
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
  
  /* Instructions */
  p {
    font-size: 0.875rem;
    color: #555;
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
  
  /* Back to Login Link */
  p a {
    color: #4569ae;
    text-decoration: none;
  }
  
  p a:hover {
    text-decoration: underline;
  }
  </style>
  