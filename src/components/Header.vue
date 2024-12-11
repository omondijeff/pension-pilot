<template>
  <header class="sticky top-0 z-50 bg-white shadow-sm transition-transform duration-75 ease-in-out" :class="{ 'translate-y-0': scrolled, '-translate-y-full': !scrolled }">
    <div class="container mx-auto flex items-center justify-between px-6 py-4">
      <!-- Logo -->
      <div class="logo">
        <a href="/" class="flex items-center">
          <img src="@/assets/logo-pension-pilot.png" alt="PensionPilot Logo" class="h-12" />
        </a>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden lg:flex space-x-8 justify-end w-full pr-4">
        <a href="/about" class="text-sm font-gilroy-light text-black hover:text-primary transition-colors duration-200">
          About Us
        </a>
        <a href="/services" class="text-sm font-gilroy-light text-black hover:text-primary transition-colors duration-200">
          Services
        </a>
        <a href="/knowledge" class="text-sm font-gilroy-light text-black hover:text-primary transition-colors duration-200">
          Help and Knowledge
        </a>
        <a href="/contact" class="text-sm font-gilroy-light text-black hover:text-primary transition-colors duration-200">
          Contact Us
        </a>
      </nav>

      <!-- Buttons for Desktop -->
      <div class="hidden lg:flex items-center space-x-4">
        <template v-if="isLoggedIn">
          <div class="flex items-center space-x-4">
            <a href="/profile" class="text-primary hover:opacity-80 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A7.962 7.962 0 0112 16c2.21 0 4.21.896 5.879 2.36M12 14a4 4 0 100-8 4 4 0 000 8zm7.878 5.362a9.966 9.966 0 01-15.756 0"
                />
              </svg>
            </a>
            <button
              @click="handleLogout"
              class="w-28 h-10 bg-white border border-black text-black rounded-md font-gilroy-bold hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </template>
        <template v-else>
          <a href="/login">
            <button class="w-28 h-10 bg-white border border-black text-black rounded-md font-gilroy-bold hover:bg-gray-100">
              Login
            </button>
          </a>
          <a href="/add-pension">
            <button class="w-28 h-10 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-md font-gilroy-bold hover:opacity-90">
              Get Started
            </button>
          </a>
        </template>
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
        About Us
      </a>
      <a href="/services" class="block text-sm font-gilroy-light text-black hover:text-primary transition-colors duration-200">
        Services
      </a>
      <a href="/knowledge" class="block text-sm font-gilroy-light text-black hover:text-primary transition-colors duration-200">
        Help and Knowledge
      </a>
      <a href="/contact" class="block text-sm font-gilroy-light text-black hover:text-primary transition-colors duration-200">
        Contact Us
      </a>
      <div class="flex flex-col space-y-2">
        <template v-if="isLoggedIn">
          <a href="/profile" class="flex items-center justify-center text-primary hover:opacity-80 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.121 17.804A7.962 7.962 0 0112 16c2.21 0 4.21.896 5.879 2.36M12 14a4 4 0 100-8 4 4 0 000 8zm7.878 5.362a9.966 9.966 0 01-15.756 0"
              />
            </svg>
          </a>
          <button
            @click="handleLogout"
            class="w-full h-10 bg-white border border-black text-black rounded-md font-gilroy-bold hover:bg-gray-100"
          >
            Logout
          </button>
        </template>
        <template v-else>
          <a href="/login">
            <button class="w-full h-10 bg-white border border-black text-black rounded-md font-gilroy-bold hover:bg-gray-100">
              Login
            </button>
          </a>
          <a href="/add-pension">
            <button class="w-full h-10 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-md font-gilroy-bold hover:opacity-90">
              Get Started
            </button>
          </a>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

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

// Authentication state
const authStore = useAuthStore();
const { isLoggedIn, logout } = authStore;
const router = useRouter();

// Logout with Header Redraw
const handleLogout = async () => {
  await logout();
  router.push('/login');
};
</script>

<style scoped>
.text-primary {
  color: #4569ae;
  font-weight: bold;
}
</style>
