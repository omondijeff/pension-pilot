<!-- src/layouts/DefaultLayout.vue -->
<template>
    <div class="flex flex-col min-h-screen">
      <Header />
      <main class="flex-grow">
        <router-view />
      </main>
      <Footer />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  
  export default defineComponent({
    name: 'DefaultLayout',
    components: {
      Header,
      Footer
    }
  })
  </script>