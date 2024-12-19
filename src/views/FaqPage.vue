<template>
  <section class="faq-page bg-gray-50 py-10">
    <!-- Banner Section -->
    <div class="banner w-full h-48 md:h-64">
      <img
        src="@/assets/faq-banner.png"
        alt="FAQ Banner"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Intro Section -->
    <div class="intro-section max-w-4xl mx-auto text-center mt-12 px-4">
      <h1 class="text-4xl font-gilroy-bold text-gray-800">Frequently Asked Questions</h1>
      <p class="text-gray-600 font-gilroy-light text-lg mt-4">
        Have questions? We've got answers! Browse through our FAQ categories to find what you're looking for.
      </p>
    </div>

    <!-- FAQ Categories Section -->
    <div class="faq-categories max-w-5xl mx-auto mt-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="(faqs, category) in groupedFaqs"
        :key="category"
        class="faq-category bg-white shadow-lg rounded-lg p-6 transition hover:shadow-xl"
      >
        <!-- Category Title -->
        <h2 class="text-2xl font-gilroy-bold text-gray-800 border-b pb-4 mb-4">
          {{ category }}
        </h2>

        <!-- FAQ Items -->
        <div
          class="faq-item border-b pb-4 mb-4 last:mb-0 last:pb-0"
          v-for="faq in faqs"
          :key="faq.question"
        >
          <div
            class="faq-question flex justify-between items-center cursor-pointer"
            @click="toggleFaq(faq)"
          >
            <p class="text-lg font-gilroy-medium text-gray-800">{{ faq.question }}</p>
            <svg
              :class="{'rotate-180': faq.open}"
              class="w-6 h-6 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
          <div
            v-if="faq.open"
            class="faq-answer mt-4 text-gray-600 font-gilroy-light text-base"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

  
  <script setup>
  import { reactive, computed } from "vue";
  import faqsData from "@/data/faqs.json"; // Import FAQs from a JSON file
  
  // Convert FAQs into a reactive array
  const faqs = reactive(
    faqsData.map((faq) => ({
      ...faq,
      open: false, // Add an open property for toggling visibility
    }))
  );
  
  // Group FAQs by category
  const groupedFaqs = computed(() => {
    return faqs.reduce((groups, faq) => {
      if (!groups[faq.category]) {
        groups[faq.category] = [];
      }
      groups[faq.category].push(faq);
      return groups;
    }, {});
  });
  
  // Toggle FAQ visibility
  const toggleFaq = (faq) => {
    faq.open = !faq.open;
  };
  </script>
  
  <style scoped>
/* Banner Section */
.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Intro Section */
.intro-section {
  padding-bottom: 3rem;
}

/* FAQ Categories Section */
.faq-categories {
  display: grid;
  gap: 1.5rem;
}

.faq-category {
  border-radius: 12px;
  padding: 1.5rem;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.faq-category:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* FAQ Items */
.faq-item {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.faq-question {
  font-family: "Gilroy-Medium";
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.faq-question:hover {
  color: #3f9fd7;
}

.faq-answer {
  margin-top: 0.75rem;
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.6;
}
</style>
