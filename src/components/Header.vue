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
              <UserCircleIcon class="h-6 w-6" />
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
        class="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-primary hover:bg-[#3F9FD7] transition-colors"
        @click="toggleMenu"
      >
        <Bars3Icon class="h-6 w-6 text-white" />
      </button>
    </div>

    <!-- Mobile Navigation -->
    <div
      v-show="menuOpen"
      class="lg:hidden absolute top-full left-0 w-full bg-white shadow-md py-4 px-6 text-lg"
      @click.self="closeMenu"
    >
      <a
        href="/about"
        class="block text-base font-gilroy-light text-black hover:text-primary transition-colors duration-200"
        @click="menuClick"
      >
        About Us
      </a>
      <a
        href="/services"
        class="block text-base font-gilroy-light text-black hover:text-primary transition-colors duration-200"
        @click="menuClick"
      >
        Services
      </a>
      <a
        href="/knowledge"
        class="block text-base font-gilroy-light text-black hover:text-primary transition-colors duration-200"
        @click="menuClick"
      >
        Help and Knowledge
      </a>
      <a
        href="/contact"
        class="block text-base font-gilroy-light text-black hover:text-primary transition-colors duration-200"
        @click="menuClick"
      >
        Contact Us
      </a>
      <div class="flex flex-row items-center justify-between mt-4">
        <template v-if="isLoggedIn">
          <a href="/profile" class="flex items-center justify-center text-primary hover:opacity-80 transition-opacity">
            <UserCircleIcon class="h-6 w-6" />
          </a>
          <button
            @click="handleLogout"
            class="h-10 flex-1 mx-1 bg-white border border-black text-black rounded-md font-gilroy-bold hover:bg-gray-100"
          >
            Logout
          </button>
        </template>
        <template v-else>
          <a href="/login" class="flex-1 mx-1">
            <button class="w-full h-10 bg-white border border-black text-black rounded-md font-gilroy-bold hover:bg-gray-100">
              Login
            </button>
          </a>
          <a href="/add-pension" class="flex-1 mx-1">
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
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { UserCircleIcon, Bars3Icon } from '@heroicons/vue/24/outline';

// State for sticky header and mobile menu
const scrolled = ref(true);
const menuOpen = ref(false);

// Handle scroll behavior
const handleScroll = () => {
  scrolled.value = window.scrollY < 50;
  if (menuOpen.value) closeMenu(); // Close menu on scroll
};

// Toggle mobile menu
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Close menu when clicking outside
const closeMenu = () => {
  menuOpen.value = false;
};

// Handle menu item click with feedback
const menuClick = () => {
  closeMenu();
};

// Close menu when clicking outside the header
onMounted(() => {
  document.addEventListener('click', (e) => {
    const header = document.querySelector('header');
    if (menuOpen.value && !header.contains(e.target)) {
      closeMenu();
    }
  });
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', closeMenu);
});

// Authentication state
const authStore = useAuthStore();
const router = useRouter();

// Use storeToRefs for reactive auth state
const { isLoggedIn } = storeToRefs(authStore);
const { logout } = authStore;

// Watch for changes in authentication state
watch(isLoggedIn, (newValue, oldValue) => {
  if (oldValue === true && newValue === false) {
    // Force a header re-render when user logs out
    nextTick(() => {
      scrolled.value = window.scrollY < 50;
    });
  }
});

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

.bg-primary {
  background-color: #4569ae;
}
</style>