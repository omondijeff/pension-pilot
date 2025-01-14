<template>
    <section class="terms-page bg-white">
      <!-- Banner Section -->
      <div class="banner w-full h-48 md:h-64">
        <img
          src="@/assets/kyc-banner.png"
          alt="Terms and Conditions Banner"
          class="w-full h-full object-cover"
        />
      </div>
  
      <!-- Intro Section -->
      <div class="intro-section max-w-5xl mx-auto mt-12 px-4 text-center">
        <h1 class="text-4xl font-gilroy-bold text-gray-800">
          Terms and Conditions
        </h1>
        <p class="text-gray-600 font-gilroy-light text-lg mt-4">
          Please read these terms and conditions carefully before using our pension management services. By using PensionPilot, you agree to be bound by these terms.
        </p>
      </div>
  
      <!-- Terms Content Section -->
      <div class="terms-content max-w-5xl mx-auto mt-12 px-4">
        <!-- Service Agreement -->
        <div class="terms-section mb-12">
          <h2 class="text-2xl font-gilroy-bold text-gray-800 mb-6">1. Service Agreement</h2>
          <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <p class="text-gray-600 font-gilroy-light mb-4">
              PensionPilot provides pension management and consolidation services subject to the following terms and conditions. These services are available to UK residents aged 18 and over.
            </p>
            <ul class="list-disc pl-5 text-gray-600 font-gilroy-light space-y-2">
              <li>Account creation requires valid identification and proof of UK residency</li>
              <li>Users must provide accurate and current information</li>
              <li>Services are subject to regulatory compliance and approval</li>
            </ul>
          </div>
        </div>
  
        <!-- Fees and Charges -->
        <div class="terms-section mb-12">
          <h2 class="text-2xl font-gilroy-bold text-gray-800 mb-6">2. Fees and Charges</h2>
          <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <p class="text-gray-600 font-gilroy-light mb-4">
              Our fee structure is transparent and based on the value of your pension savings:
            </p>
            <ul class="list-disc pl-5 text-gray-600 font-gilroy-light space-y-2">
              <li>Standard: 1% annual fee for portfolios under £100,000</li>
              <li>Premium: 0.75% annual fee for portfolios over £500,000</li>
              <li>Exclusive: 0.5% annual fee for portfolios over £1,000,000</li>
              <li>Minimum annual fee of £250 applies to all accounts</li>
            </ul>
          </div>
        </div>
  
        <!-- Privacy and Data Protection -->
        <div class="terms-section mb-12">
          <h2 class="text-2xl font-gilroy-bold text-gray-800 mb-6">3. Privacy and Data Protection</h2>
          <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <p class="text-gray-600 font-gilroy-light mb-4">
              We are committed to protecting your personal data in accordance with GDPR and UK data protection laws:
            </p>
            <ul class="list-disc pl-5 text-gray-600 font-gilroy-light space-y-2">
              <li>Your data is processed securely and legally</li>
              <li>We collect only necessary information for service provision</li>
              <li>Data sharing is limited to authorized service providers</li>
              <li>You have the right to access and correct your information</li>
            </ul>
          </div>
        </div>
  
        <!-- Investment Risks -->
        <div class="terms-section mb-12">
          <h2 class="text-2xl font-gilroy-bold text-gray-800 mb-6">4. Investment Risks</h2>
          <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <p class="text-gray-600 font-gilroy-light mb-4">
              All investments carry risks and past performance is not indicative of future results:
            </p>
            <ul class="list-disc pl-5 text-gray-600 font-gilroy-light space-y-2">
              <li>Investment values can go down as well as up</li>
              <li>Your capital is at risk</li>
              <li>Returns are not guaranteed</li>
              <li>Consider seeking independent financial advice</li>
            </ul>
          </div>
        </div>
  
        <!-- Account Termination -->
        <div class="terms-section mb-12">
          <h2 class="text-2xl font-gilroy-bold text-gray-800 mb-6">5. Account Termination</h2>
          <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <p class="text-gray-600 font-gilroy-light mb-4">
              Either party may terminate the service agreement under the following conditions:
            </p>
            <ul class="list-disc pl-5 text-gray-600 font-gilroy-light space-y-2">
              <li>30 days written notice required</li>
              <li>Outstanding fees must be settled</li>
              <li>Pension transfers will be processed according to regulatory timeframes</li>
            </ul>
          </div>
        </div>
      </div>
  
      <!-- Contact Section -->
      <div class="contact-section max-w-5xl mx-auto mt-12 mb-20 px-4 text-center">
        <h2 class="text-2xl font-gilroy-bold text-gray-800 mb-4">Questions About Our Terms?</h2>
        <p class="text-gray-600 font-gilroy-light mb-6">
          If you have any questions about these terms and conditions, please contact our support team.
        </p>
        <button class="px-6 py-3 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-lg font-gilroy-bold hover:opacity-90 transition-all duration-200 ease-in-out">
          Contact Support
        </button>
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
  
  /* Terms Content Section */
  .terms-section {
    transition: all 0.3s ease;
  }
  
  .terms-section:hover {
    transform: translateY(-2px);
  }
  
  /* Contact Section */
  .contact-section {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
  </style>