<template>
  <section class="our-plans-page relative bg-gradient-to-br from-white to-gray-50 overflow-hidden">
    <!-- Banner Section -->
    <div class="banner w-full h-48 md:h-64 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-50"></div>
      <img
        src="@/assets/plans-banner.png"
        alt="Our Plans Banner"
        class="w-full h-full object-cover mix-blend-multiply"
      />
    </div>

    <!-- Why Choose Pension Pilot? Section -->
    <div class="why-choose-section max-w-5xl mx-auto mt-16 px-4">
      <h1 class="text-4xl font-gilroy-bold text-gray-900 mb-12">
        Why Choose Pension Pilot?
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- Benefit Cards -->
        <div class="plan-card group text-center bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-8">
          <div class="w-20 h-20 mx-auto mb-6">
            <img
              src="@/assets/low-risk-icon.png"
              alt="Pension Tracking Icon"
              class="w-full h-full object-contain"
            />
          </div>
          <h3 class="text-xl font-gilroy-bold text-gray-900 mb-4">Pension Tracking & Discovery</h3>
          <p class="text-gray-600 font-gilroy-light text-base leading-relaxed">
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
    <div class="fees-coverage-section max-w-5xl mx-auto mt-24 px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 class="text-3xl font-gilroy-bold text-gray-900 mb-8">One Time Fee</h2>
        <p class="text-gray-600 font-gilroy-light">

          Pension Pilot offers complimentary pension consolidation when you choose to invest your pension assets with one of our trusted partner providers. However, if you prefer to manage your investments independently, a flat fee of £220 will apply, which will be deducted from your pension pot.
        </p>
      </div>
      <div>
        <img
          src="@/assets/fees-coverage-illustration.png"
          alt="Fees Illustration"
          class="w-full h-auto rounded-lg"
        />
      </div>
    </div>

    <div class="contact-section bg-white py-24 px-4">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl font-gilroy-bold text-gray-900 mb-8 text-center">Ready to Consolidate Your Pensions?</h2>
        <p class="text-gray-600 font-gilroy-light text-center mb-12">
          Contact us today to start consolidating your pensions and take control of your retirement savings.
        </p>
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