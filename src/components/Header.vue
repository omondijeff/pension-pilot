<template>
  <header class="sticky top-0 z-50 bg-white shadow-sm transition-transform duration-300 ease-in-out" :class="{ 'translate-y-0': scrolled, '-translate-y-full': !scrolled }">
    <div class="container mx-auto flex items-center justify-between px-6 py-4">
      <!-- Logo -->
      <div class="logo">
        <a href="/" class="flex items-center">
          <img src="@/assets/logo-pension-pilot.png" alt="PensionPilot Logo" class="h-12" />
        </a>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden lg:flex space-x-8 justify-end w-full">
        <a href="/about" class="text-sm font-gilroy-light text-black hover:text-primary transition-colors duration-200">
          Why PensionPilot
        </a>
        <a href="/services" class="text-sm font-gilroy-light text-black hover:text-primary transition-colors duration-200">
          Help and Knowledge
        </a>
      </nav>

      <!-- Buttons for Desktop -->
      <div class="hidden lg:flex space-x-4">
        <a href="/login">
          <button class="w-28 h-10 bg-white border border-black text-black rounded-md font-gilroy-bold hover:bg-gray-100">
            Login
          </button>
        </a>
        <a href="/get-started">
          <button class="w-28 h-10 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-md font-gilroy-bold hover:opacity-90">
            Get Started
          </button>
        </a>
      </div>

      <!-- Hamburger Button for Mobile -->
      <button
        class="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white"
        @click="toggleMenu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <div
      v-show="menuOpen"
      class="lg:hidden absolute top-full left-0 w-full bg-white shadow-md py-4 px-6 space-y-4 text-lg"
    >
      <a href="/about" class="block text-sm font-gilroy-light text-black hover:text-primary transition-colors duration-200">
        Why PensionPilot
      </a>
      <a href="/services" class="block text-sm font-gilroy-light text-black hover:text-primary transition-colors duration-200">
        Help and Knowledge
      </a>
      <div class="flex flex-col space-y-2">
        <a href="/login">
          <button class="w-full h-10 bg-white border border-black text-black rounded-md font-gilroy-bold hover:bg-gray-100">
            Login
          </button>
        </a>
        <a href="/get-started">
          <button class="w-full h-10 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-md font-gilroy-bold hover:opacity-90">
            Get Started
          </button>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// State for sticky header and mobile menu
const scrolled = ref(true);
const menuOpen = ref(false);

// Handle scroll behavior
const handleScroll = () => {
  scrolled.value = window.scrollY < 50;
};

// Toggle mobile menu
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Add/remove scroll event listener
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Logo Styling */
.logo img {
  height: 3rem; /* Enlarged logo height */
  transition: transform 0.3s ease;
}

.logo:hover img {
  transform: scale(1.1); /* Slight zoom effect on hover */
}

/* Primary color for hover */
.text-primary {
  color: #4569ae;
}
</style>
