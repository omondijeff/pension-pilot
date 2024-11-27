<template>
  <section 
    class="landing-section flex items-center justify-center h-screen bg-cover bg-center" 
    :style="backgroundImageStyle"
  >
    <div class="container mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between">
      <!-- Left Column (Empty) -->
      <div class="flex-1 hidden md:block"></div>

      <!-- Right Column (Text Content) -->
      <div class="flex-1 text-white md:pl-12 space-y-10">
        <!-- Heading -->
        <h1 class="font-bold leading-tight text-center md:text-left text-[64px] font-gilroy">
          Plan today,<br />secure tomorrow.
        </h1>
        <!-- Paragraph -->
        <p class="text-center md:text-left text-[26px] font-light mt-10">
          Combine, manage, and grow your pensions effortlessly. Whether you’re planning, saving, 
          or withdrawing, PensionPilot empowers you to take control of your financial future.
        </p>
        <!-- Buttons -->
        <div class="flex flex-col md:flex-row mt-10 space-y-4 md:space-y-0 md:space-x-4">
          <!-- Get Started Button -->
          <button 
            class="px-6 py-3 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white border-none rounded-[6px] text-center w-[180px] h-[50px]">
            Get Started
          </button>
          <!-- See Plans Button -->
          <button 
            class="px-6 py-3 bg-white text-black border border-black rounded-[6px] text-center w-[180px] h-[50px]">
            See Plans
          </button>
        </div>
        <!-- Logo and Text -->
        <div class="flex items-center mt-10 space-x-4">
          <img src="@/assets/fscs-protected.png" alt="FSCS" class="w-16 h-16 rounded-full object-cover" />
          <p class="text-[20px] font-light">With investments, your capital is at risk.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import landingImage from '@/assets/landing-page.png';

const backgroundImageStyle = {
  backgroundImage: `url(${landingImage})`
};
</script>

<style scoped>
  .landing-section {
    background-size: cover;
    background-position: center;
  }
</style>
