<template>
  <section 
    class="landing-section flex items-center justify-center h-screen bg-cover bg-left md:bg-center relative" 
    :style="backgroundImageStyle"
  >
    <!-- Gradient Overlay (for mobile) -->
    <div class="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent md:hidden"></div>

    <div class="container mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between relative">
      <!-- Left Column (Empty) -->
      <div class="flex-1 hidden md:block"></div>

      <!-- Right Column (Text Content) -->
      <div class="flex-1 text-white md:pl-12 space-y-6 sm:space-y-8 text-right">
        <!-- Heading -->
        <h1 class="leading-tight text-right text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-gilroy-bold">
          Plan today,<br />secure tomorrow.
        </h1>
        <!-- Paragraph -->
        <p class="text-right text-sm sm:text-lg md:text-xl font-gilroy-light mt-4 md:mt-6">
          Combine, manage, and grow your pensions effortlessly. Whether you’re planning, saving, 
          or withdrawing, PensionPilot empowers you to take control of your financial future.
        </p>
        <!-- Buttons -->
        <div class="flex flex-row flex-wrap justify-end mt-6 md:mt-10 gap-4">
          <!-- Get Started Button -->
          <router-link to="/about-you">
            <button 
              class="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white border-none rounded-lg text-center font-gilroy">
              Get Started
            </button>
          </router-link>
          <!-- See Plans Button -->
          <router-link to="/services">
            <button 
              class="w-full sm:w-auto px-4 sm:px-6 py-3 bg-white text-black rounded-lg text-center font-gilroy">
              See Plans
            </button>
          </router-link>
        </div>
        <!-- Logo and Text -->
        <div class="flex items-center justify-end mt-6 md:mt-10 space-x-4">
          <img src="@/assets/fscs-protected.png" alt="FSCS" class="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-full object-cover" />
          <p class="text-sm sm:text-lg md:text-xl font-gilroy-light">
            With investments, your capital is at risk.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import landingImage from '@/assets/landing-page-young.png';

const backgroundImageStyle = {
  backgroundImage: `url(${landingImage})`,
  backgroundPosition: 'left 20% center' // Moves the focus to the left half for mobile.
};
</script>

<style scoped>
.landing-section {
  background-size: cover;
  background-position: center;
  position: relative;
}

/* Buttons Styling */
button {
  transition: transform 0.3s ease, background-color 0.3s ease;
}

button:hover {
  transform: scale(1.05);
}

/* Mobile-Specific Styling */
@media (max-width: 768px) {
  .bg-left {
    background-position: 15% center; /* Shows more of the left half of the image */
  }
}
</style>
