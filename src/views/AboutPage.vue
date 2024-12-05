<template>
  <section class="about-us-page bg-white">
    <!-- Banner Section -->
    <div class="banner w-full h-48 md:h-64">
      <img
        src="@/assets/about-us-banner.png"
        alt="About Us Banner"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Intro Section -->
    <div class="intro-section max-w-5xl mx-auto mt-12 px-4 text-center">
      <h1 class="text-4xl font-gilroy-bold text-gray-800">
        Simplify Your Pensions: Merge, Grow, and Manage Effortlessly
      </h1>
    </div>

    <!-- Features Section -->
    <div class="features-section max-w-5xl mx-auto mt-12 px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
      <div class="feature text-center">
        <img src="@/assets/feature-icon-1.png" alt="Feature 1" class="mx-auto w-28 h-28" />
        <h3 class="text-xl font-gilroy-bold text-gray-800 mt-4">Combine Pensions</h3>
        <p class="text-gray-600 font-gilroy-light text-base mt-2">
          Easily bring all your pensions together in just a few clicks. Save time, reduce
          hassle, and get a clear view of your retirement savings—all in minutes.
        </p>
      </div>
      <div class="feature text-center">
        <img src="@/assets/feature-icon-2.png" alt="Feature 2" class="mx-auto w-28 h-28" />
        <h3 class="text-xl font-gilroy-bold text-gray-800 mt-4">Grow Your Pot</h3>
        <p class="text-gray-600 font-gilroy-light text-base mt-2">
          Boost your pension with seamless contributions and the expertise of our
          dedicated investment team. Watch your savings grow with strategies
          tailored to your future goals.
        </p>
      </div>
      <div class="feature text-center">
        <img src="@/assets/feature-icon-3.png" alt="Feature 3" class="mx-auto w-28 h-28" />
        <h3 class="text-xl font-gilroy-bold text-gray-800 mt-4">Withdraw with Ease</h3>
        <p class="text-gray-600 font-gilroy-light text-base mt-2">
          Access your pension whenever you need it, with a simple and hassle-free
          withdrawal process.
        </p>
      </div>
    </div>

    <!-- About PensionPilot Section -->
    <div class="about-section max-w-5xl mx-auto mt-16 px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 class="text-4xl font-gilroy-bold text-gray-800">About PensionPilot</h2>
        <p class="text-gray-600 font-gilroy-light text-base mt-4">
          We're here to make your financial future simpler and brighter. By
          uncovering your existing pensions and consolidating them into one
          easy-to-manage plan, we take the hassle out of managing your
          retirement savings. Our platform empowers you as an investor, giving
          you access to a diverse range of top-performing companies, so your
          money grows intelligently and transparently.
        </p>
      </div>
      <div>
        <img src="@/assets/about-us-image.jpg" alt="About PensionPilot" class="w-full h-auto rounded-lg" />
      </div>
    </div>
  </section>
</template>

<script setup>
// No additional logic needed
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
  padding-top: 3rem;
  padding-bottom: 3rem;
}

/* Features Section */
.features-section {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.feature {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* About PensionPilot Section */
.about-section {
  padding-top: 4rem;
  padding-bottom: 4rem;
}

.about-section img {
  max-height: 400px;
  object-fit: cover;
}
</style>