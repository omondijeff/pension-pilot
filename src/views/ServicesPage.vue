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

    <!-- Why Choose Pension Pilot? Section -->
    <div class="why-choose-section max-w-5xl mx-auto mt-12 px-4">
      <h1 class="text-4xl font-gilroy-bold text-gray-800 mb-8">
        Why Choose Pension Pilot?
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Benefit Cards -->
        <div class="plan-card text-center">
          <img
            src="@/assets/low-risk-icon.png"
            alt="Pension Tracking Icon"
            class="w-20 h-20 mx-auto"
          />
          <h3 class="text-xl font-gilroy-bold text-gray-800 mt-4">Pension Tracking & Discovery</h3>
          <p class="text-gray-600 font-gilroy-light mt-2">
            We help locate all your existing pensions, including dormant or forgotten accounts.
          </p>
        </div>
        <div class="plan-card text-center">
          <img
            src="@/assets/medium-risk-icon.png"
            alt="Personalised Advice Icon"
            class="w-20 h-20 mx-auto"
          />
          <h3 class="text-xl font-gilroy-bold text-gray-800 mt-4">Personalised Advice</h3>
          <p class="text-gray-600 font-gilroy-light mt-2">
            Receive a suitability report from a qualified Independent Financial Adviser (IFA), tailored to your goals and risk profile.
          </p>
        </div>
        <div class="plan-card text-center">
          <img
            src="@/assets/high-risk-icon.png"
            alt="Free Consolidation Icon"
            class="w-20 h-20 mx-auto"
          />
          <h3 class="text-xl font-gilroy-bold text-gray-800 mt-4">Free Consolidation</h3>
          <p class="text-gray-600 font-gilroy-light mt-2">
            Enjoy complimentary pension consolidation when you invest through one of our trusted partner providers.
          </p>
        </div>
        <div class="plan-card text-center">
          <img
            src="@/assets/medium-risk-icon.png"
            alt="Flat-fee Alternative Icon"
            class="w-20 h-20 mx-auto"
          />
          <h3 class="text-xl font-gilroy-bold text-gray-800 mt-4">Flat-fee Alternative</h3>
          <p class="text-gray-600 font-gilroy-light mt-2">
            Prefer to manage your investments independently? A one-time £220 fee will be deducted from your pension pot.
          </p>
        </div>
        <div class="plan-card text-center">
          <img
            src="@/assets/low-risk-icon.png"
            alt="Simplified Management Icon"
            class="w-20 h-20 mx-auto"
          />
          <h3 class="text-xl font-gilroy-bold text-gray-800 mt-4">Simplified Management</h3>
          <p class="text-gray-600 font-gilroy-light mt-2">
            Combine your pensions into one account for reduced admin and a clearer view of your retirement savings.
          </p>
        </div>
        <div class="plan-card text-center">
          <img
            src="@/assets/high-risk-icon.png"
            alt="Smarter Investing Icon"
            class="w-20 h-20 mx-auto"
          />
          <h3 class="text-xl font-gilroy-bold text-gray-800 mt-4">Smarter Investing</h3>
          <p class="text-gray-600 font-gilroy-light mt-2">
            Access enhanced investment opportunities and potentially lower fees through consolidation with our partners.
          </p>
        </div>
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
        <p class="text-gray-600 font-gilroy-light mb-4">One-time fee of £220 for independent investment management</p>
        <div class="fees-categories flex space-x-6 items-center">
          <!-- Standard Plan -->
          <div class="text-center">
            <img
              src="@/assets/standard-fee-icon.png"
              alt="Standard Plan"
              class="w-20 h-20 mx-auto"
            />
            <p class="text-gray-600 font-gilroy-light mt-2">Free consolidation</p>
            <p class="text-sm font-bold text-gray-700">Partner Investment</p>
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