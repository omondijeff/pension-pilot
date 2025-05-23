<template>
  <section class="about-us-page">
    <!-- Banner Section -->
    <div 
      class="banner w-full h-64 bg-cover bg-center relative" 
      :style="bannerBackgroundStyle"
    ></div>

    <!-- Intro Section -->
    <div class="intro-section max-w-5xl mx-auto mt-16 px-4 text-center">
      <h1 class="text-4xl font-gilroy-bold text-gray-800">
        Simplify Your Pensions: Merge, Grow, and Manage Effortlessly
      </h1>
    </div>

    <!-- Features Section -->
<!-- Features Section -->
<div class="features-section max-w-5xl mx-auto mt-20 px-4">
  <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
    <div class="relative">
      <img src="@/assets/feature-icon-1.png" alt="Combine Pensions" class="w-full h-70 object-fit" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
    </div>
    <div class="p-8 text-center">
      <h3 class="text-2xl font-gilroy-bold text-gray-900 mb-4">Combine Pensions</h3>
      <p class="text-gray-600 font-gilroy-light text-lg leading-relaxed">
        Easily bring all your pensions together in just a few clicks. Save time, reduce hassle, and get a clear view of your retirement savings.
      </p>
      <div class="mt-6">
        <router-link to="/add-pension">
          <button class="px-6 py-3 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-lg font-gilroy-bold hover:opacity-90 transition-all duration-300">
            Get Started
          </button>
        </router-link>
      </div>
    </div>
  </div>
</div>


    <!-- About Section -->
    <div class="about-section max-w-5xl mx-auto mt-24 px-4">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-gilroy-bold text-gray-800">About PensionPilot</h2>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <p class="text-gray-600 font-gilroy-light text-base">
            We're here to make your financial future simpler. Pension Pilot helps you locate and combine your scattered pension pots into one easy-to-manage account. Just share a few basic details, and we'll find your old pensions. Pension Pilot removes the complexity of retirement planning. You'll receive expert guidance through FCA-regulated advisers and have the option to invest your savings with one of our trusted partners. With tailored strategies aligned to your goals and risk profile, you can feel confident your money is working smarter — now and for the future.
          </p>
        </div>
        <div>
          <img src="@/assets/about-us-image.jpg" alt="About PensionPilot" class="w-full h-auto rounded-lg" />
        </div>
      </div>
    </div>

 <!-- How It Works Section -->
<div class="how-it-works-section py-20">
  <div class="max-w-5xl mx-auto px-4 text-center">
    <h2 class="text-4xl font-gilroy-bold text-gray-800 mb-8">How It Works</h2>
    <img
      src="@/assets/ssteps.svg" 
      alt="How It Works Steps Illustration"
      class="w-full h-auto"
    />
  </div>
</div>

    <!-- CTA Section -->
    <section 
      class="cta-section bg-cover bg-center relative" 
      :style="ctaBackgroundStyle"
    >
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-black/50"></div>

      <div class="container mx-auto px-6 w-full h-full relative">
        <!-- Desktop Content -->
        <div class="hidden md:flex items-center justify-between h-full">
          <div class="flex-1 hidden md:block"></div>
          <div class="flex-1 text-black md:pl-12 space-y-10 text-left">
            <h2 class="leading-tight text-4xl font-gilroy-bold">
              Ready to take charge of your financial future?
            </h2>
            <p class="text-lg font-gilroy-light">
              PensionPilot is your partner in managing, growing, and withdrawing your retirement savings. Join thousands who are already building a brighter tomorrow with us.
            </p>
            <router-link to="/add-pension">
              <button
                class="px-6 py-3 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-lg font-gilroy-bold hover:opacity-90"
              >
                Add Pension
              </button>
            </router-link>
          </div>
        </div>

        <!-- Mobile Content -->
        <div class="flex md:hidden items-center justify-center h-full text-center">
          <div class="text-white space-y-6">
            <h2 class="text-3xl font-gilroy-bold">
              Ready to take charge of your financial future?
            </h2>
            <p class="text-base font-gilroy-light">
              PensionPilot is your partner in managing, growing, and withdrawing your retirement savings. Join thousands who are already building a brighter tomorrow with us.
            </p>
            <router-link to="/add-pension">
              <button
                class="px-6 py-3 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-lg font-gilroy-bold hover:opacity-90"
              >
                Add Pension
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </section>

<!-- Testimonials Section -->
<div class="testimonials-section py-16 bg-white">
  <div class="max-w-5xl mx-auto px-4 text-center">
    <h2 class="text-4xl font-gilroy-bold text-gray-800 mb-10">
      What our clients say about us.
    </h2>
    <swiper
      :slides-per-view="1"
      :space-between="16"
      loop="true"
      :breakpoints="{
        640: { slidesPerView: 1.2 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }"
    >
      <!-- Testimonial 1 -->
      <swiper-slide>
        <div class="testimonial-card p-6 rounded-lg border border-blue-300 shadow-md">
          <img
            src="@/assets/client-1.jpg"
            alt="James Pattinson"
            class="mx-auto w-24 h-24 rounded-full object-cover mb-4"
          />
          <h3 class="text-lg font-gilroy-bold text-gray-800 mb-2">James Pattinson</h3>
          <div class="flex justify-center text-gold mb-4">
            <i v-for="star in 5" :key="star" class="fas fa-star"></i>
          </div>
          <p class="text-gray-600 font-gilroy-light text-base leading-relaxed">
            "I was able to combine all my pensions seamlessly, and the whole process felt straightforward and stress-free. I now feel much more confident about my financial future."
          </p>
        </div>
      </swiper-slide>

      <!-- Testimonial 2 -->
      <swiper-slide>
        <div class="testimonial-card p-6 rounded-lg border border-blue-300 shadow-md">
          <img
            src="@/assets/client-2.jpg"
            alt="Annabelle"
            class="mx-auto w-24 h-24 rounded-full object-cover mb-4"
          />
          <h3 class="text-lg font-gilroy-bold text-gray-800 mb-2">Amara</h3>
          <div class="flex justify-center text-gold mb-4">
            <i v-for="star in 5" :key="star" class="fas fa-star"></i>
          </div>
          <p class="text-gray-600 font-gilroy-light text-base leading-relaxed">
            "Being a freelancer, I often worried about keeping track of my pensions. This service made it so simple and gave me complete control over my retirement savings."
          </p>
        </div>
      </swiper-slide>

      <!-- Testimonial 3 -->
      <swiper-slide>
        <div class="testimonial-card p-6 rounded-lg border border-blue-300 shadow-md">
          <img
            src="@/assets/client-3.jpg"
            alt="Trevor Mitchell"
            class="mx-auto w-24 h-24 rounded-full object-cover mb-4"
          />
          <h3 class="text-lg font-gilroy-bold text-gray-800 mb-2">Trevor Mitchell</h3>
          <div class="flex justify-center text-gold mb-4">
            <i v-for="star in 5" :key="star" class="fas fa-star"></i>
          </div>
          <p class="text-gray-600 font-gilroy-light text-base leading-relaxed">
            "This platform helped me consolidate multiple pensions with no hassle. I appreciate the transparency and the regular updates I get about my savings."
          </p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</div>


  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';


import bannerImage from '@/assets/about-us-banner.png';
import ctaImageDesktop from '@/assets/cta-desktop.jpg';
import ctaImageMobile from '@/assets/cta-mobile.jpg';

const bannerBackgroundStyle = {
  backgroundImage: `url(${bannerImage})`,
};

const ctaBackgroundStyle = {
  backgroundImage: `url(${ctaImageDesktop})`,
};
</script>

<style scoped>

.text-gold {
  color: #FFD700; /* Gold color for stars */
}

.cta-section {
  background-size: cover;
  background-position: center;
  height: 466px;
}

@media (max-width: 768px) {
  .cta-section {
    background-image: url('@/assets/cta-mobile.jpg');
    background-position: 15% center;
    height: 466px;
  }
}
</style>
