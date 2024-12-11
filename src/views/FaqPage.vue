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
          Have questions? We have got answers! Browse through our FAQ categories to find what you're looking for.
        </p>
      </div>
  
      <!-- FAQ Categories Section -->
      <div class="faq-categories max-w-5xl mx-auto mt-12 px-4">
        <div
          v-for="(faqs, category) in groupedFaqs"
          :key="category"
          class="faq-category mb-10"
        >
          <!-- Category Title -->
          <h2 class="text-2xl font-gilroy-bold text-gray-800 mb-6">
            {{ category }}
          </h2>
  
          <!-- FAQ Items -->
          <div class="faq-item bg-white shadow-md rounded-lg mb-4" v-for="faq in faqs" :key="faq.question">
            <div
              class="faq-question flex justify-between items-center px-6 py-4 cursor-pointer"
              @click="toggleFaq(faq)"
            >
              <p class="text-lg font-gilroy-medium text-gray-800">{{ faq.question }}</p>
              <svg
                :class="{'rotate-180': faq.open}"
                class="w-6 h-6 transition-transform"
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
              class="faq-answer px-6 pb-4 text-gray-600 font-gilroy-light text-base"
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
  
  /* FAQ Categories */
  .faq-category {
    margin-bottom: 2rem;
  }
  
  /* FAQ Items */
  .faq-item {
    border-radius: 8px;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
  }
  
  .faq-item:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .faq-question {
    background-color: #f9fafb;
    font-family: "Gilroy-Medium";
  }
  
  .faq-answer {
    background-color: #ffffff;
  }
  </style>
  