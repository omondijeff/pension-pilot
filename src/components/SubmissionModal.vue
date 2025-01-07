<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="$emit('close')" />
    
    <!-- Modal -->
    <div class="relative mx-auto w-full max-w-4xl rounded-xl bg-white shadow-lg">
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <h3 class="text-xl font-semibold text-gray-900">
          Submissions for {{ user?.name }}
        </h3>
        <button 
          @click="$emit('close')" 
          class="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
        >
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <!-- User Info -->
      <div class="space-y-6 px-6 py-4">
        <div class="rounded-lg bg-gray-50 p-4">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <p class="text-sm font-medium text-gray-500">Email</p>
              <p class="mt-1 text-sm text-gray-900">{{ user?.email }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Date of Birth</p>
              <p class="mt-1 text-sm text-gray-900">{{ formatDob }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">NI Number</p>
              <p class="mt-1 text-sm text-gray-900">{{ formattedNiNumber }}</p>
            </div>
          </div>
        </div>

        <!-- Submissions Table -->
        <div class="overflow-hidden rounded-lg border border-gray-200">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Provider</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Policy Number</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Current Employer</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Created</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Update Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="submission in submissions" :key="submission.id">
                <td class="whitespace-nowrap px-6 py-4">
                  <span class="text-sm font-medium text-gray-900">{{ submission.provider }}</span>
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                  <span class="text-sm text-gray-500">{{ submission.policy_number || '-' }}</span>
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                  <span class="text-sm text-gray-500">{{ submission.current_employer ? 'Yes' : 'No' }}</span>
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                  <span class="text-sm text-gray-500">{{ formatCreatedDate(submission.created_at) }}</span>
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                  <span
                    :class="{
                      'inline-flex rounded-full px-2 py-1 text-xs font-medium': true,
                      'bg-green-100 text-green-800': submission.status === 'consolidated',
                      'bg-amber-100 text-amber-800': submission.status === 'in_process',
                      'bg-gray-100 text-gray-800': submission.status === 'not_started'
                    }"
                  >
                    {{ formatStatus(submission.status) }}
                  </span>
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                  <select
                    :value="submission.status"
                    @change="(event) => handleStatusChange(event, submission.id)"
                    class="block w-full rounded-md border-gray-300 py-1.5 pl-3 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  >
                    <option value="not_started">Not Started</option>
                    <option value="in_process">In Process</option>
                    <option value="consolidated">Consolidated</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Footer -->
      <div class="border-t border-gray-200 px-6 py-4">
        <div class="flex justify-end">
          <button 
            type="button" 
            @click="$emit('close')"
            class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

interface User {
  id: string;
  name: string;
  email: string;
}

interface KycProfile {
  id: string;
  user_id: string;
  dob_day: string | null;
  dob_month: string | null;
  dob_year: string | null;
  national_insurance: string | null;
}

interface Submission {
  id: string;
  provider: string;
  policy_number: string | null;
  current_employer: boolean;
  created_at: string;
  status: 'not_started' | 'in_process' | 'consolidated';
}

type SubmissionStatus = 'not_started' | 'in_process' | 'consolidated';

export default defineComponent({
  name: 'SubmissionModal',

  props: {
    submissions: {
      type: Array as () => Submission[],
      required: true
    },
    user: {
      type: Object as () => User,
      required: true
    },
    kycProfile: {
      type: Object as () => KycProfile,
      required: true
    }
  },

  emits: ['close', 'update-status'],

  setup(props, { emit }) {
    const formatDob = computed(() => {
      if (!props.kycProfile) return '-';
      const { dob_day, dob_month, dob_year } = props.kycProfile;
      if (!dob_day || !dob_month || !dob_year) return '-';
      const day = dob_day.padStart(2, '0');
      const month = dob_month.padStart(2, '0');
      return `${day}/${month}/${dob_year}`;
    });

    const formattedNiNumber = computed(() => {
      if (!props.kycProfile?.national_insurance) return '-';
      const ni = props.kycProfile.national_insurance;
      const firstPart = ni.slice(0, 2);
      const middlePart = ni.slice(2, 8);
      const lastPart = ni.slice(8);
      return `${firstPart} ${middlePart} ${lastPart}`;
    });

    const formatCreatedDate = (date: string) => {
      return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    };

    const formatStatus = (status: string) => {
      return status.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    };

    const handleStatusChange = (event: Event, submissionId: string) => {
      const select = event.target as HTMLSelectElement;
      const newStatus = select.value as SubmissionStatus;
      emit('update-status', submissionId, newStatus);
    };

    return {
      formatDob,
      formattedNiNumber,
      formatCreatedDate,
      formatStatus,
      handleStatusChange
    };
  }
});
</script>