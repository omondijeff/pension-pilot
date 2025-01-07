<template>
  <section class="our-plans-page bg-white">
    <!-- Banner Section -->
    <div class="banner w-full h-48 md:h-64">
      <img
        src="@/assets/plans-banner.png"
        alt="Our Plans Banner"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Intro Section -->
    <div class="intro-section max-w-5xl mx-auto mt-12 px-4 text-center">
      <h1 class="text-4xl font-gilroy-bold text-gray-800">
        Our Plans
      </h1>
      <p class="text-gray-600 font-gilroy-light text-lg mt-4">
        Choose a plan that suits your needs and investment goals. Whether you're looking for low risk or high growth, we have options for you.
      </p>
    </div>

    <!-- Plans Section -->
    <div class="plans-section max-w-5xl mx-auto mt-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Low Risk Plan -->
      <div class="plan-card text-center">
        <img
          src="@/assets/low-risk-icon.png"
          alt="Low Risk Plan Icon"
          class="w-20 h-20 mx-auto"
        />
        <h3 class="text-xl font-gilroy-bold text-gray-800 mt-4">Low Risk Plan</h3>
        <p class="text-gray-600 font-gilroy-light mt-2">
          Ideal for those who prefer stability and preservation of capital while achieving modest growth.
        </p>
      </div>

      <!-- Medium Risk Plan -->
      <div class="plan-card text-center">
        <img
          src="@/assets/medium-risk-icon.png"
          alt="Medium Risk Plan Icon"
          class="w-20 h-20 mx-auto"
        />
        <h3 class="text-xl font-gilroy-bold text-gray-800 mt-4">Medium Risk Plan</h3>
        <p class="text-gray-600 font-gilroy-light mt-2">
          Perfect for individuals looking for a balance between growth and security.
        </p>
      </div>

      <!-- High Risk Plan -->
      <div class="plan-card text-center">
        <img
          src="@/assets/high-risk-icon.png"
          alt="High Risk Plan Icon"
          class="w-20 h-20 mx-auto"
        />
        <h3 class="text-xl font-gilroy-bold text-gray-800 mt-4">High Risk Plan</h3>
        <p class="text-gray-600 font-gilroy-light mt-2">
          For those who seek high growth potential and are comfortable with greater market volatility.
        </p>
      </div>
    </div>

    <!-- Fees Coverage Section -->
    <div class="fees-coverage-section max-w-5xl mx-auto mt-20 px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        <h2 class="text-3xl font-gilroy-bold text-gray-800 mb-6">Fees Coverage</h2>
        <p class="text-gray-600 font-gilroy-light text-lg mb-4">
          Joining PensionPilot is completely free! We charge a simple and highly competitive annual fee based on your pension savings.
        </p>
        <ul class="list-disc pl-5 text-gray-600 font-gilroy-light space-y-2">
          <li><strong>No charges for:</strong></li>
          <li>Consolidating your pension.</li>
          <li>Transferring your pension to PensionPilot or moving it elsewhere.</li>
          <li>Switching to a different plan within the PensionPilot.</li>
          <li>Adding funds to your pension.</li>
        </ul>
        <h3 class="text-xl font-gilroy-bold text-gray-800 mt-6">Fees</h3>
        <p class="text-gray-600 font-gilroy-light mb-4">Minimum of £250 fee a year</p>
        <div class="fees-categories flex space-x-6 items-center">
          <!-- Standard Plan -->
          <div class="text-center">
            <img
              src="@/assets/standard-fee-icon.png"
              alt="Standard Plan"
              class="w-20 h-20 mx-auto"
            />
            <p class="text-gray-600 font-gilroy-light mt-2">&lt; £100k</p>
            <p class="text-sm font-bold text-gray-700">Standard</p>
          </div>
          <!-- Premium Plan -->
          <div class="text-center">
            <img
              src="@/assets/premium-fee-icon.png"
              alt="Premium Plan"
              class="w-20 h-20 mx-auto"
            />
            <p class="text-gray-600 font-gilroy-light mt-2">&gt; £500k</p>
            <p class="text-sm font-bold text-gray-700">Premium</p>
          </div>
          <!-- Exclusive Plan -->
          <div class="text-center">
            <img
              src="@/assets/exclusive-fee-icon.png"
              alt="Exclusive Plan"
              class="w-20 h-20 mx-auto"
            />
            <p class="text-gray-600 font-gilroy-light mt-2">&gt; £1m</p>
            <p class="text-sm font-bold text-gray-700">Exclusive</p>
          </div>
        </div>
      </div>
      <div>
        <img
          src="@/assets/fees-coverage-illustration.png"
          alt="Fees Illustration"
          class="w-full h-auto"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
// No additional logic required for this static page.
</script>

<style scoped>
/* Banner Section */
.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Intro Section */
.intro-section {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

/* Plans Section */
.plans-section {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.plan-card img {
  max-height: 80px;
}

/* Fees Coverage Section */
.fees-coverage-section {
  padding-top: 4rem;
  padding-bottom: 4rem;
}
</style>