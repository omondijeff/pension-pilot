<!-- src/components/dashboard/DashboardSidebar.vue -->
<template>
    <aside class="w-64 bg-gray-50 border-r">
      <nav class="p-4">
        <ul class="space-y-2">
          <li>
            <router-link 
              to="/dashboard" 
              class="block px-4 py-2 rounded-lg hover:bg-gray-100"
              :class="{ 'bg-gray-100': $route.path === '/dashboard' }"
            >
              Dashboard Home
            </router-link>
          </li>
          <li>
            <router-link 
              to="/dashboard/about-you" 
              class="block px-4 py-2 rounded-lg hover:bg-gray-100"
              :class="{ 'bg-gray-100': $route.path === '/dashboard/about-you' }"
            >
              About You
            </router-link>
          </li>
          <li>
            <router-link 
              to="/dashboard/add-pension" 
              class="block px-4 py-2 rounded-lg hover:bg-gray-100"
              :class="{ 'bg-gray-100': $route.path === '/dashboard/add-pension' }"
            >
              Add Pension
            </router-link>
          </li>
          <li>
            <router-link 
              to="/dashboard/profile" 
              class="block px-4 py-2 rounded-lg hover:bg-gray-100"
              :class="{ 'bg-gray-100': $route.path === '/dashboard/profile' }"
            >
              Profile
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'DashboardSidebar'
  })
  </script>