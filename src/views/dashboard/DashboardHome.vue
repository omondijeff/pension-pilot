<!-- src/views/dashboard/DashboardHome.vue -->
<template>
    <div>
      <h1 class="text-2xl font-bold mb-6">Welcome to Your Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Add dashboard content here -->
        <div class="p-6 bg-white rounded-lg shadow">
          <h2 class="text-lg font-semibold mb-4">Your Pensions</h2>
          <!-- Add pension summary content -->
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'DashboardHome'
  })
  </script>