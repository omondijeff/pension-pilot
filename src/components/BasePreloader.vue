//src/components/BasePreloader.vue
<template>
  <div 
    v-if="show" 
    class="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center"
  >
    <div class="w-16 h-16">
      <svg 
        class="animate-spin"
        viewBox="0 0 50 50"
      >
        <circle
          class="stroke-[#4569AE] stroke-[3]"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke-linecap="round"
          style="stroke-dasharray: 90, 150"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean;
}>();
</script>