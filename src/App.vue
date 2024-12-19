<!-- src/App.vue -->
<template>
  <div id="app" class="flex flex-col min-h-screen">
    <!-- Remove these direct component imports -->
    <!-- <Header />
    <Body class="flex-grow" />
    <Footer /> -->
    
    <!-- Instead, use router-view -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
authStore.initializeAuth()
</script>

<style src="./assets/styles/main.css"></style>