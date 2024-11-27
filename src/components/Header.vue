<template>
    <header
      class="sticky top-0 z-50 bg-white shadow-sm transition-all duration-300 ease-in-out"
      :class="{ 'translate-y-0': scrolled, '-translate-y-full': !scrolled }"
    >
      <div class="container mx-auto flex justify-between items-center px-6 py-4">
        <!-- Logo -->
        <div class="logo">
          <img src="@/assets/logo.png" alt="Logo" class="h-8" />
        </div>
  
        <!-- Navigation Menu and Buttons Wrapper -->
        <div class="flex items-center space-x-6 w-full justify-between">
          <!-- Menu Items (Hidden on mobile) -->
          <nav class="menu flex space-x-6 justify-end w-full">
            
            <a href="/about" class="menu-item">Why PensionPilot</a>
            <a href="/services" class="menu-item">Help and Knowledge</a>
          </nav>
  
          <!-- Buttons -->
          <div class="flex items-center space-x-4">
            <button class="button-login">Login</button>
            <button class="button-start">Get Started</button>
          </div>
        </div>
  
        <!-- Hamburger Button (Mobile) -->
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
  
      <!-- Mobile Menu -->
      <div
        v-show="menuOpen"
        class="lg:hidden bg-white shadow-md absolute top-full left-0 w-full py-4 px-6 space-y-4 text-lg font-medium"
      >
        <a href="/" class="block hover:text-primary transition">Home</a>
        <a href="/about" class="block hover:text-primary transition">About</a>
        <a href="/services" class="block hover:text-primary transition">
          Help and Knowledge
        </a>
        <div class="flex flex-col space-y-2">
          <button class="button-login-mobile">Login</button>
          <button class="button-start-mobile">Get Started</button>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  
  const scrolled = ref(true); // Default to true to ensure visibility initially.
  const menuOpen = ref(false);
  
  const handleScroll = () => {
    scrolled.value = window.scrollY < 50; // Adjust threshold as needed.
  };
  
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
  };
  
  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });
  
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
  </script>
  
  <style scoped>
  /* Smooth header transition */
  html {
    scroll-behavior: smooth;
  }
  
  /* General styles for the menu items */
  .menu {
    display: flex;
    justify-content: flex-end;
    gap: 1.5rem;
  }
  
  .menu-item {
    font-family: 'Gilroy-Medium', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0.5px;
    color: #000000;
    display: flex;
    align-items: center;
    transition: color 0.3s;
  }
  
  .menu-item:hover {
    color: #4569ae; /* Hover color for menu items */
  }
  
  /* Button styles */
  .button-login,
  .button-login-mobile {
    width: 120px;
    height: 40px;
    background: white;
    border: 1px solid black;
    color: black;
    border-radius: 6px;
    transition: background 0.3s, color 0.3s;
  }
  
  .button-login:hover {
    background-color: #f5f5f5;
  }
  
  .button-login-mobile {
    width: 100%;
    height: 40px;
    background: white;
    border: 1px solid black;
    color: black;
    border-radius: 6px;
    transition: background 0.3s, color 0.3s;
  }
  
  .button-start,
  .button-start-mobile {
    width: 120px;
    height: 40px;
    background: linear-gradient(263.24deg, #4569ae 0.74%, #3f9fd7 100%);
    border-radius: 6px;
    color: white;
    font-family: 'Gilroy-Medium', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0.5px;
    transition: opacity 0.3s;
  }
  
  .button-start:hover {
    opacity: 0.9;
  }
  
  .button-start-mobile {
    width: 100%;
    height: 40px;
    background: linear-gradient(263.24deg, #4569ae 0.74%, #3f9fd7 100%);
    border-radius: 6px;
    color: white;
    font-family: 'Gilroy-Medium', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0.5px;
    transition: opacity 0.3s;
  }
  
  button:hover {
    cursor: pointer;
  }
  
  /* Mobile Menu Styles */
  @media (max-width: 1024px) {
    .container {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  
    /* Adjust for Hamburger Menu */
    .logo {
      flex: 0 1 auto;
    }
  
    .menu {
      display: none;
    }
  
    .lg\:hidden {
      display: block;
    }
  
    .menu-item {
      font-size: 14px; /* Adjust font size for mobile */
    }
  }
  
  /* Mobile Menu Active */
  @media (max-width: 768px) {
    .menu {
      display: block;
    }
  }
  </style>
  