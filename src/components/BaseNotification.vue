// src/components/BaseNotification.vue
<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform -translate-y-2 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform -translate-y-2 opacity-0"
  >
    <div
      v-if="show"
      :class="[
        'flex items-center p-4 rounded-lg font-gilroy-light mb-4',
        typeClasses[type]
      ]"
      role="alert"
    >
      <!-- Icon Section -->
      <div class="flex-shrink-0 mr-3">
        <component
          :is="icons[type]"
          class="w-5 h-5"
          :class="iconClasses[type]"
        />
      </div>

      <!-- Content Section -->
      <div class="flex-grow">
        <p
          v-if="title"
          class="text-sm font-gilroy-bold mb-1"
          :class="textClasses[type]"
        >
          {{ title }}
        </p>
        <p
          class="text-sm"
          :class="textClasses[type]"
        >
          {{ message }}
        </p>
      </div>

      <!-- Close Button -->
      <button
        v-if="dismissible"
        @click="dismiss"
        class="flex-shrink-0 ml-4 focus:outline-none"
        :class="textClasses[type]"
      >
        <XMarkIcon class="w-5 h-5 hover:opacity-80" />
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/vue/24/solid';

interface Props {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
  show?: boolean;
  dismissible?: boolean;
  duration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  show: true,
  dismissible: true,
  duration: 0
});

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void;
  (e: 'dismiss'): void;
}>();

// Icons mapping
const icons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationCircleIcon,
  info: InformationCircleIcon,
};

// Background colors
const typeClasses = {
  success: 'bg-green-50 border border-green-200',
  error: 'bg-red-50 border border-red-200',
  warning: 'bg-yellow-50 border border-yellow-200',
  info: 'bg-blue-50 border border-blue-200',
};

// Icon colors
const iconClasses = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
};

// Text colors
const textClasses = {
  success: 'text-green-800',
  error: 'text-red-800',
  warning: 'text-yellow-800',
  info: 'text-blue-800',
};

// Auto-dismiss timer
if (props.duration > 0) {
  setTimeout(() => {
    dismiss();
  }, props.duration);
}

// Dismiss handler
const dismiss = () => {
  emit('update:show', false);
  emit('dismiss');
};
</script>