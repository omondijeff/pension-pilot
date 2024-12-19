<!-- src/layouts/DashboardLayout.vue -->
<template>
    <div class="flex flex-col min-h-screen">
      <DashboardHeader />
      <div class="flex flex-grow">
        <DashboardSidebar />
        <main class="flex-grow p-6">
          <router-view />
        </main>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import DashboardHeader from '@/components/dashboard/DashboardHeader.vue'
  import DashboardSidebar from '@/components/dashboard/DashboardSidebar.vue'
  
  export default defineComponent({
    name: 'DashboardLayout',
    components: {
      DashboardHeader,
      DashboardSidebar
    }
  })
  </script>