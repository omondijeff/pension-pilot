<template>
  <div id="app" class="flex flex-col min-h-screen">
    <Header />
    <Body class="flex-grow" />
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import Body from '@/components/Body.vue';
import Footer from '@/components/Footer.vue';
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
authStore.initializeAuth()

</script>

<style src="./assets/styles/main.css"></style>
