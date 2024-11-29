<template>
    <section class="kyc-page bg-white">
      <!-- Banner Section -->
      <div class="banner w-full h-48 md:h-64">
        <img
          src="@/assets/kyc-banner.png" 
          alt="About You"
          class="w-full h-full object-cover"
        />
      </div>
  
      <!-- Form Section -->
      <div class="form-section max-w-xl mx-auto mt-8 px-4">
        <!-- Title -->
        <h1 class="text-3xl font-gilroy-bold text-center text-gray-800">
          About You
        </h1>
        <p class="text-center text-gray-600 font-gilroy-light mt-2">
          Please provide a few details to help us confirm your identity
        </p>
  
        <!-- KYC Form -->
        <form @submit.prevent="handleNextStep" class="space-y-6 mt-6">
          <!-- Date of Birth -->
          <div>
            <label class="block text-gray-600 font-gilroy-light mb-2">
              Date of birth
            </label>
            <div class="flex space-x-2">
              <input
                type="text"
                placeholder="dd"
                v-model="dob.day"
                class="w-1/3 p-3 border border-gray-300 rounded-lg text-center"
                maxlength="2"
                required
              />
              <input
                type="text"
                placeholder="mm"
                v-model="dob.month"
                class="w-1/3 p-3 border border-gray-300 rounded-lg text-center"
                maxlength="2"
                required
              />
              <input
                type="text"
                placeholder="yyyy"
                v-model="dob.year"
                class="w-1/3 p-3 border border-gray-300 rounded-lg text-center"
                maxlength="4"
                required
              />
            </div>
          </div>
  
          <!-- Gender -->
          <div>
            <label class="block text-gray-600 font-gilroy-light mb-2">
              Gender
            </label>
            <div class="flex space-x-4">
              <button
                type="button"
                :class="gender === 'Male' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'"
                @click="gender = 'Male'"
                class="p-3 w-full rounded-lg border"
              >
                Male
              </button>
              <button
                type="button"
                :class="gender === 'Female' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'"
                @click="gender = 'Female'"
                class="p-3 w-full rounded-lg border"
              >
                Female
              </button>
            </div>
          </div>
  
          <!-- Mobile Number -->
          <div>
            <label class="block text-gray-600 font-gilroy-light mb-2">
              Mobile Number
            </label>
            <div class="flex space-x-2">
              <select
                v-model="mobile.country"
                class="w-1/3 p-3 border border-gray-300 rounded-lg"
              >
                <option value="UK">UK</option>
                <option value="US">US</option>
                <option value="IN">IN</option>
              </select>
              <input
                type="tel"
                placeholder="+44 7911 123 456"
                v-model="mobile.number"
                class="w-2/3 p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>
  
          <!-- National Insurance Number -->
          <div>
            <label class="block text-gray-600 font-gilroy-light mb-2">
              National Insurance Number
            </label>
            <input
              type="text"
              placeholder="QQ123456B"
              v-model="nationalInsurance"
              class="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <p class="text-sm text-gray-500 font-gilroy-light mt-1">
              Make sure this information is accurate, as it’s required to access
              your PensionPilot Pension. You can find your National Insurance (NI)
              number on your P60, payslip, tax return, or by contacting HMRC. 
              <a href="#" class="text-blue-500 hover:underline">HMRC’s free tool</a>
            </p>
          </div>
  
          <!-- Postcode -->
          <div>
            <label class="block text-gray-600 font-gilroy-light mb-2">
              Postcode
            </label>
            <div class="flex space-x-2">
              <input
                type="text"
                placeholder="e.g., SW1A 2AA"
                v-model="postcode"
                class="w-2/3 p-3 border border-gray-300 rounded-lg"
                required
              />
              <button
                type="button"
                class="w-1/3 bg-blue-500 text-white p-3 rounded-lg"
                @click="findAddress"
              >
                Find Address
              </button>
            </div>
          </div>
  
          <!-- Next Button -->
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-3 rounded-lg font-gilroy-bold"
          >
            Next
          </button>
        </form>
      </div>
    </section>
  </template>
  
  <script setup>
  /* Form Data */
  const dob = { day: '', month: '', year: '' };
  const gender = '';
  const mobile = { country: 'UK', number: '' };
  const nationalInsurance = '';
  const postcode = '';
  
  /* Handlers */
  const handleNextStep = () => {
    console.log("Form submitted", { dob, gender, mobile, nationalInsurance, postcode });
  };
  
  const findAddress = () => {
    console.log("Finding address for postcode:", postcode);
  };
  </script>
  
  <style scoped>
  /* Banner Section */
  .banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* Form Section */
  .form-section {
    background-color: white;
    border-radius: 8px;
    padding: 2rem;
  }
  </style>
  