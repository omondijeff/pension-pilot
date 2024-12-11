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
    <div class="features-section max-w-5xl mx-auto mt-20 px-4 grid grid-cols-1 sm:grid-cols-3 gap-12">
      <div class="feature text-center shadow-md rounded-lg">
        <img src="@/assets/feature-icon-1.png" alt="Feature 1" class="w-full h-40 object-cover rounded-t-lg" />
        <div class="p-6">
          <h3 class="text-xl font-gilroy-bold text-gray-800 mt-4">Combine Pensions</h3>
          <p class="text-gray-600 font-gilroy-light text-base mt-2">
            Easily bring all your pensions together in just a few clicks. Save time, reduce
            hassle, and get a clear view of your retirement savings—all in minutes.
          </p>
        </div>
      </div>
      <div class="feature text-center shadow-md rounded-lg">
        <img src="@/assets/feature-icon-2.png" alt="Feature 2" class="w-full h-40 object-cover rounded-t-lg" />
        <div class="p-6">
          <h3 class="text-xl font-gilroy-bold text-gray-800 mt-4">Grow Your Pot</h3>
          <p class="text-gray-600 font-gilroy-light text-base mt-2">
            Boost your pension with seamless contributions and the expertise of our
            dedicated investment team. Watch your savings grow with strategies
            tailored to your future goals.
          </p>
        </div>
      </div>
      <div class="feature text-center shadow-md rounded-lg">
        <img src="@/assets/feature-icon-3.png" alt="Feature 3" class="w-full h-40 object-cover rounded-t-lg" />
        <div class="p-6">
          <h3 class="text-xl font-gilroy-bold text-gray-800 mt-4">Withdraw with Ease</h3>
          <p class="text-gray-600 font-gilroy-light text-base mt-2">
            Access your pension whenever you need it, with a simple and hassle-free
            withdrawal process.
          </p>
        </div>
      </div>
    </div>

    <!-- About Section -->
<!-- About Section -->
<div class="about-section max-w-5xl mx-auto mt-20 px-4">
  <!-- Section Title -->
  <div class="text-center mb-12">
    <h2 class="text-4xl font-gilroy-bold text-gray-800">
      About PensionPilot
    </h2>
  </div>
  <!-- Content Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
    <!-- Left Content -->
    <div>
      <p class="text-gray-600 font-gilroy-light text-base">
        We're here to make your financial future simpler and brighter. By
        uncovering your existing pensions and consolidating them into one
        easy-to-manage plan, we take the hassle out of managing your
        retirement savings. Our platform empowers you as an investor, giving
        you access to a diverse range of top-performing companies, so your
        money grows intelligently and transparently.
      </p>
    </div>
    <!-- Right Image -->
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
          src="@/assets/how-it-works-illustration.png"
          alt="How It Works Steps Illustration"
          class="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>

  <!-- CTA Section -->
<section 
  class="cta-section flex items-center justify-center bg-cover bg-center my-20" 
  :style="ctaBackgroundStyle"
>
  <div class="container mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between" style="height: 466px;">
    <!-- Left Column (Empty for Placement) -->
    <div class="flex-1 hidden md:block"></div>
    
    <!-- Right Column (Content) -->
    <div class="flex-1 text-black md:pl-12 space-y-10">
      <h2 class="leading-tight text-center md:text-left text-4xl font-gilroy-bold">
        Ready to take charge of your financial future?
      </h2>
      <p class="text-center md:text-left text-lg font-gilroy-light mt-6">
        PensionPilot is your partner in managing, growing, and withdrawing your retirement savings.
        Join thousands who are already building a brighter tomorrow with us.
      </p>
      <router-link to="/add-pension">
        <button 
          class="px-6 py-3 mt-8 bg-gradient-to-r from-blue-600 to-blue-400 text-white border-none rounded-lg text-center font-gilroy">
          Add Pension
        </button>
      </router-link>
    </div>
  </div>
</section>


    <!-- Testimonials Section -->
    <div class="testimonials-section py-16 bg-white">
      <div class="max-w-5xl mx-auto px-4 text-center">
        <h2 class="text-4xl font-gilroy-bold text-gray-800 mb-10">
          What our clients say about us.
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Testimonial 1 -->
          <div class="testimonial-card p-6 rounded-lg border border-blue-300 shadow-md">
            <img
              src="@/assets/client-1.jpg"
              alt="James Pattinson"
              class="mx-auto w-24 h-24 rounded-full object-cover mb-4"
            />
            <h3 class="text-lg font-gilroy-bold text-gray-800 mb-2">James Pattinson</h3>
            <div class="flex justify-center text-blue-500 mb-4">
              <i v-for="star in 5" :key="star" class="fas fa-star"></i>
            </div>
            <p class="text-gray-600 font-gilroy-light text-base leading-relaxed">
              "Lobortis leo pretium facilisis amet nisl at nec. Scelerisque risus tortor donec ipsum
              consequat semper consequat adipiscing ultrices."
            </p>
          </div>

          <!-- Testimonial 2 -->
          <div class="testimonial-card p-6 rounded-lg border border-blue-300 shadow-md">
            <img
              src="@/assets/client-2.jpg"
              alt="Annabelle"
              class="mx-auto w-24 h-24 rounded-full object-cover mb-4"
            />
            <h3 class="text-lg font-gilroy-bold text-gray-800 mb-2">Annabelle</h3>
            <div class="flex justify-center text-blue-500 mb-4">
              <i v-for="star in 5" :key="star" class="fas fa-star"></i>
            </div>
            <p class="text-gray-600 font-gilroy-light text-base leading-relaxed">
              "Vestibulum, cum nam non amet consectetur morbi aenean condimentum eget. Ultricies integer
              nunc neque accumsan laoreet. Viverra nibh ultrices."
            </p>
          </div>

          <!-- Testimonial 3 -->
          <div class="testimonial-card p-6 rounded-lg border border-blue-300 shadow-md">
            <img
              src="@/assets/client-3.jpg"
              alt="Trevor Mitchell"
              class="mx-auto w-24 h-24 rounded-full object-cover mb-4"
            />
            <h3 class="text-lg font-gilroy-bold text-gray-800 mb-2">Trevor Mitchell</h3>
            <div class="flex justify-center text-blue-500 mb-4">
              <i v-for="star in 5" :key="star" class="fas fa-star"></i>
            </div>
            <p class="text-gray-600 font-gilroy-light text-base leading-relaxed">
              "Ut tristique viverra sed porttitor senectus. A facilisis metus pretium ut habitant lorem.
              Velit vel bibendum eget aliquet sem nec, id sed. Tincidunt."
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import bannerImage from '@/assets/about-us-banner.png';
import ctaImage from '@/assets/cta-background.jpg';

const bannerBackgroundStyle = {
  backgroundImage: `url(${bannerImage})`
};

const ctaBackgroundStyle = {
  backgroundImage: `url(${ctaImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%'
};
</script>

<style scoped>
.about-us-page {
  background-color: #fff;
}

.banner {
  background-size: cover;
  background-position: center;
}

.cta-section {
  background-size: cover;
  background-position: center;
  width: 100%;
}

.feature img {
  border-radius: 0;
}

.feature {
  transition: transform 0.3s ease;
}
.feature:hover {
  transform: scale(1.05);
}

.testimonial-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.fas {
  font-size: 20px;
}
</style>
