<template>
    <section class="pension-page bg-white">
      <!-- Banner Section -->
      <div class="banner w-full h-48 md:h-64">
        <img
          src="@/assets/pension-banner.png"
          alt="Add a Pension"
          class="w-full h-full object-cover"
        />
      </div>
  
      <!-- Form Section -->
      <div class="form-section max-w-xl mx-auto mt-8 px-4">
        <!-- Title -->
        <h1 class="text-3xl font-gilroy-bold text-center text-gray-800">
          Add a Pension
        </h1>
        <p class="text-center text-gray-600 font-gilroy-light mt-2">
          Please provide the name of your previous pension provider. The more
          details you share, the quicker we can transfer your funds.
        </p>
  
        <!-- Pension Form -->
        <form @submit.prevent="handlePensionSubmit" class="space-y-6 mt-6">
          <!-- Pension Provider -->
          <div>
            <label class="block text-gray-600 font-gilroy-light mb-2">
              Who is the pension provider?
            </label>
            <select
              v-model="pension.provider"
              class="w-full p-3 border border-gray-300 rounded-lg"
              required
            >
              <option value="" disabled>Select Pension</option>
              <option value="People's Pension">People's Pension</option>
              <option value="Nest">Nest</option>
              <option value="Aviva">Aviva</option>
            </select>
          </div>
  
          <!-- Policy Number -->
          <div>
            <label class="block text-gray-600 font-gilroy-light mb-2">
              What is your policy number? (Optional)
            </label>
            <input
              type="text"
              placeholder="Enter policy number"
              v-model="pension.policyNumber"
              class="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
  
          <!-- Current Employer -->
          <div>
            <label class="block text-gray-600 font-gilroy-light mb-2">
              Is your current employer paying into the pension?
            </label>
            <div class="flex space-x-4">
              <button
                type="button"
                :class="pension.currentEmployer ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'"
                @click="pension.currentEmployer = true"
                class="p-3 w-full rounded-lg border"
              >
                Yes
              </button>
              <button
                type="button"
                :class="pension.currentEmployer === false ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'"
                @click="pension.currentEmployer = false"
                class="p-3 w-full rounded-lg border"
              >
                No
              </button>
            </div>
          </div>
  
          <!-- Add Another Pension Button -->
          <button
            type="button"
            class="w-full bg-gray-200 text-gray-800 p-3 rounded-lg font-gilroy-light"
            @click="addAnotherPension"
          >
            Add another pension
          </button>
  
          <!-- Signature Section -->
          <div class="mt-6">
            <p class="text-sm text-gray-600 font-gilroy-light mb-2">
              Most providers require a signature to release pension information.
              By signing below, you authorize PensionPilot to retrieve this
              information.
            </p>
            <div
              class="signature-box border border-gray-300 rounded-lg p-6 text-gray-500 flex items-center justify-center"
              @click="openSignaturePad"
            >
              Tap here to sign
            </div>
          </div>
  
          <!-- Confirmation -->
          <div>
            <label class="block text-gray-600 font-gilroy-light mt-6">
              <input type="checkbox" v-model="confirmAgreement" />
              I agree to transfer the pension balance(s) to the PensionBee Tailored
              Plan. I'm aware I can change my plan at any time.
            </label>
            <label class="block text-gray-600 font-gilroy-light mt-4">
              <input type="checkbox" v-model="confirmTerms" />
              I confirm that I've read, understand and agree to the Terms,
              including the Declarations, Data Protection and Transfer
              authorizations contained therein.
            </label>
          </div>
  
          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-3 rounded-lg font-gilroy-bold mt-6"
            :disabled="!confirmAgreement || !confirmTerms"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  </template>
  
  <script setup>
  /* Pension Data */
  const pension = {
    provider: '',
    policyNumber: '',
    currentEmployer: null,
  };
  let confirmAgreement = false;
  let confirmTerms = false;
  
  /* Handlers */
  const handlePensionSubmit = () => {
    console.log("Pension submitted:", pension);
  };
  
  const addAnotherPension = () => {
    console.log("Adding another pension...");
  };
  
  const openSignaturePad = () => {
    console.log("Opening signature pad...");
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
  
  .signature-box {
    cursor: pointer;
    height: 150px;
  }
  </style>
  