<template>
  <header class="sticky top-0 z-50 bg-white shadow-sm transition-transform duration-300 ease-in-out" :class="{ 'translate-y-0': scrolled, '-translate-y-full': !scrolled }">
    <div class="container mx-auto flex items-center justify-between px-6 py-4">
      <!-- Logo -->
      <div class="logo">
        <img src="@/assets/logo-pension-pilot.png" alt="PensionPilot Logo" class="h-8" />
      </div>

      <!-- Desktop Navigation (Aligned to the right) -->
      <nav class="hidden lg:flex space-x-8 justify-end w-full">
        <a href="/about" class="menu-item">Why PensionPilot</a>
        <a href="/services" class="menu-item">Help and Knowledge</a>
      </nav>

      <!-- Buttons for Desktop -->
      <div class="hidden lg:flex space-x-4">
        <button class="button-login">Login</button>
        <button class="button-start">Get Started</button>
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
      <a href="/about" class="menu-item block">Why PensionPilot</a>
      <a href="/services" class="menu-item block">Help and Knowledge</a>
      <div class="flex flex-col space-y-2">
        <button class="button-login-mobile">Login</button>
        <button class="button-start-mobile">Get Started</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const scrolled = ref(true);
const menuOpen = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY < 50;
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Sticky Header */
header {
  font-family: 'Gilroy', sans-serif;
  transition: transform 0.3s ease-in-out;
}

/* Menu Items - Right-aligned */
.menu-item {
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  color: #000000;
  transition: color 0.3s ease;
}

.menu-item:hover {
  color: #4569ae;
}

/* Buttons */
.button-login,
.button-login-mobile {
  width: 120px;
  height: 40px;
  background: white;
  border: 1px solid black;
  color: black;
  border-radius: 6px;
  transition: background-color 0.3s, color 0.3s;
}

.button-login:hover,
.button-login-mobile:hover {
  background-color: #f5f5f5;
}

.button-start,
.button-start-mobile {
  width: 120px;
  height: 40px;
  background: linear-gradient(263.24deg, #4569ae 0.74%, #3f9fd7 100%);
  border-radius: 6px;
  color: white;
  transition: opacity 0.3s ease;
}

.button-start:hover,
.button-start-mobile:hover {
  opacity: 0.9;
}

/* Mobile Menu */
@media (max-width: 1024px) {
  .menu-item {
    font-size: 14px;
  }
}

/* Adjust Mobile Styles */
@media (max-width: 768px) {
  .menu-item {
    font-size: 14px;
  }

  .button-login-mobile,
  .button-start-mobile {
    width: 100%;
  }
}
</style>
