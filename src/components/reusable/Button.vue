<template>
    <button
      :class="[
        variant === 'primary' ? 'btn-primary' : 'btn-secondary',
        className
      ]"
    >
      <slot />
    </button>
  </template>
  
  <script setup>
  defineProps({
    variant: {
      type: String,
      default: 'primary', // Can be 'primary' or 'secondary'
    },
    className: {
      type: String,
      default: '', // Allows for additional customization
    },
  });
  </script>
  