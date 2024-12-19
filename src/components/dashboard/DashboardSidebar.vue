<template>
  <aside class="w-64 bg-gradient-to-b from-[#4569AE] to-[#3F9FD7] text-white h-screen">
    <nav class="p-6">
      <!-- Logo Section -->
      <div class="flex items-center justify-center mb-8">
        <img src="@/assets/logo-white.png" alt="PensionPilot Logo" class="w-24 h-auto" />
      </div>
      <!-- Navigation Links -->
      <ul class="space-y-4">
        <li>
          <router-link 
            to="/dashboard" 
            class="block px-4 py-3 rounded-lg hover:bg-white hover:text-[#4569AE] transition-colors duration-200"
            :class="{ 'bg-white text-[#4569AE]': $route.path === '/dashboard' }"
          >
            Dashboard Home
          </router-link>
        </li>
        <li>
          <router-link 
            to="/dashboard/about-you" 
            class="block px-4 py-3 rounded-lg hover:bg-white hover:text-[#4569AE] transition-colors duration-200"
            :class="{ 'bg-white text-[#4569AE]': $route.path === '/dashboard/about-you' }"
          >
            About You
          </router-link>
        </li>
        <li>
          <router-link 
            to="/dashboard/add-pension" 
            class="block px-4 py-3 rounded-lg hover:bg-white hover:text-[#4569AE] transition-colors duration-200"
            :class="{ 'bg-white text-[#4569AE]': $route.path === '/dashboard/add-pension' }"
          >
            Add Pension
          </router-link>
        </li>
        <li>
          <router-link 
            to="/dashboard/profile" 
            class="block px-4 py-3 rounded-lg hover:bg-white hover:text-[#4569AE] transition-colors duration-200"
            :class="{ 'bg-white text-[#4569AE]': $route.path === '/dashboard/profile' }"
          >
            Profile
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DashboardSidebar',
});
</script>

<style scoped>
aside {
  font-family: 'Gilroy', sans-serif;
}
img {
  /* Ensure the logo is responsive */
  max-width: 100%;
  height: auto;
}
</style>
