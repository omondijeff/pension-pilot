<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-gray-900 opacity-50" @click="$emit('close')"></div>
      <div class="relative bg-white w-full max-w-2xl mx-auto rounded-lg shadow-lg p-6">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-xl font-gilroy-bold leading-6 text-gray-900">
            KYC Profile Details
          </h3>
          <button type="button" class="text-gray-400 hover:text-gray-500" @click="$emit('close')">
            <span class="sr-only">Close</span>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div v-if="kycProfile" class="grid grid-cols-2 gap-4">
          <div v-for="(value, field) in formattedProfile" :key="field">
            <dt class="text-sm font-gilroy-medium text-gray-500">
              {{ field }}
            </dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ value || 'N/A' }}
            </dd>
          </div>
        </div>
        <div v-else class="text-center text-gray-500">
          No KYC information available
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  import type { KycProfile } from '@/lib/database.types';
  
  export default defineComponent({
    name: 'KycModal',
    props: {
      kycProfile: {
        type: Object as () => KycProfile,
        required: true
      },
    },
    setup(props) {
      const formattedProfile = computed(() => {
        const { id, user_id, created_at, updated_at, ...fields } = props.kycProfile || {};
        
        return Object.entries(fields).reduce((result, [key, value]) => {
          const formattedKey = key
            .split('_')
            .map((word, index) => index === 0 ? 
              word.charAt(0).toUpperCase() + word.slice(1) :
              word
            )
            .join(' ');
          
          result[formattedKey] = value;
          
          return result;
        }, {} as Record<string, string | null>)
      });
  
      return {
        formattedProfile  
      };
    }
  });
  </script>