<!-- src/App.vue -->
<template>
  <div id="app" class="flex flex-col min-h-screen">
    <!-- Global preloader -->
    <BasePreloader :show="isLoading" />
    
    <!-- Main content -->
    <router-view v-slot="{ Component }">
      <transition
        name="fade"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import BasePreloader from '@/components/BasePreloader.vue';
import router, { isLoading } from '@/router';

const authStore = useAuthStore();

// Initialize auth on app mount
onMounted(async () => {
  await authStore.initializeAuth();
});
</script>

<style src="./assets/styles/main.css"></style>

<!-- Page transition animations -->
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>