<template>
  <section class="dashboard-home bg-gray-50 min-h-screen">
    <div class="container mx-auto px-6 py-8">
      <!-- Welcome Header -->
      <h1 class="text-3xl font-gilroy-bold text-gray-800 mb-6">Welcome to Your Dashboard</h1>

      <!-- Submissions Section -->
      <div>
        <h2 class="text-2xl font-gilroy-bold text-gray-800 mb-4">All Pension Submissions</h2>
        
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-6">
          <p class="text-lg text-gray-600">Loading submissions...</p>
        </div>
        
        <!-- Submissions Grid -->
        <div v-else-if="submissions.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="submission in submissions"
            :key="submission.id"
            class="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <h3 class="text-xl font-semibold text-[#4569AE] mb-2">{{ submission.provider }}</h3>
            <p class="text-gray-600 font-gilroy-light">
              <strong>Policy Number:</strong> {{ submission.policy_number || 'N/A' }}
            </p>
            <p class="text-gray-600 font-gilroy-light">
              <strong>Current Employer:</strong> {{ submission.current_employer ? 'Yes' : 'No' }}
            </p>
            <p class="text-gray-600 font-gilroy-light">
              <strong>Submitted On:</strong>
              {{ submission.created_at ? new Date(submission.created_at).toLocaleDateString() : 'Not Available' }}
            </p>
          </div>
        </div>

        <!-- No Submissions State -->
        <div v-else class="text-center mt-10">
          <p class="text-gray-600 font-gilroy-light">No pension submissions found. Start adding your pensions now!</p>
          <router-link to="/dashboard/add-pension">
            <button class="mt-4 px-6 py-3 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-lg font-gilroy-bold hover:opacity-90 shadow-lg transition-transform hover:scale-105">
              Add Pension
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { usePensionSubmissionsStore } from '@/stores/pensionSubmissions';

export default {
  name: 'DashboardHome',
  setup() {
    const pensionStore = usePensionSubmissionsStore();
    const loading = ref(false);

    onMounted(async () => {
      loading.value = true;
      try {
        await pensionStore.fetchAllSubmissions(); // Fetch all submissions
      } catch (err) {
        console.error('Error fetching submissions:', err);
      } finally {
        loading.value = false;
      }
    });

    return {
      submissions: pensionStore.submissions,
      loading,
    };
  },
};
</script>

<style scoped>
.dashboard-home {
  font-family: 'Gilroy', sans-serif;
}

button {
  transition: transform 0.3s ease;
}

button:hover {
  transform: scale(1.05);
}
</style>
