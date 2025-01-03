<!-- src/App.vue -->
<template>
  <div id="app" class="flex flex-col min-h-screen">
    <!-- Global preloader -->
    <BasePreloader :show="loading" />
    
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
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import BasePreloader from '@/components/BasePreloader.vue';

const authStore = useAuthStore();
const loading = ref(false);

// Initialize auth on app mount
onMounted(async () => {
  loading.value = true;
  try {
    await authStore.initializeAuth();
  } finally {
    loading.value = false;
  }
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