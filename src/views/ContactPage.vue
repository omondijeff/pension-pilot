<template>
  <section class="contact-page bg-white">
    <!-- Banner Section -->
    <div class="banner w-full h-48 md:h-64">
      <img
        src="@/assets/contact-banner.png"
        alt="Contact Us Banner"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Content Section -->
    <div class="content-section max-w-5xl mx-auto mt-12 px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h1 class="text-3xl font-gilroy-bold text-gray-800">Contact Us</h1>
        <p class="text-gray-600 font-gilroy-light text-base mt-4">
          Email, call, or complete the form to learn how PensionPilot can solve your pension problem.
        </p>
        <p class="text-gray-600 font-gilroy-light text-base mt-4"><a href="mailto:info@pensionpilot.co.uk" class="text-blue-600 hover:underline"> info@pensionpilot.co.uk</a></p>
        <!-- <p class="text-gray-600 font-gilroy-light text-base">123-123-123</p> -->

        <div class="socials mt-8">
          <h2 class="text-lg font-gilroy-bold text-gray-800">Socials</h2>
          <div class="mt-4 space-y-2">
            <a href="#" class="text-blue-500 font-gilroy-light hover:text-blue-700">Instagram</a>
            <a href="#" class="text-blue-500 font-gilroy-light hover:text-blue-700">Twitter</a>
            <a href="#" class="text-blue-500 font-gilroy-light hover:text-blue-700">Facebook</a>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-3xl font-gilroy-bold text-gray-800">Get in Touch</h2>
        <p class="text-gray-600 font-gilroy-light text-base mt-4">
          You can reach us anytime
        </p>

        <form class="mt-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First name"
              class="p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Last name"
              class="p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <input
            type="email"
            placeholder="Your email"
            class="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="tel"
            placeholder="Phone number"
            class="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <textarea
            placeholder="How can we help?"
            rows="4"
            class="w-full p-3 border border-gray-300 rounded-lg"
            required
          ></textarea>
          <button
            type="submit"
            class="w-full py-3 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-lg font-gilroy-bold hover:opacity-90"
          >
            Submit
          </button>
        </form>
      </div>
    </div>

    <!-- Location Section -->
    <!-- <div class="location-section max-w-5xl mx-auto mt-12 px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <img src="@/assets/location-map.png" alt="Location Map" class="w-full rounded-lg" />
      <div class="text-gray-600 font-gilroy-light">
        <p class="text-lg font-gilroy-bold text-gray-800">PensionPilot</p>
        <p>Street: 11 Caradon Hill</p>
        <p>City: Tyle-garw</p>
        <p>Zip code: CF72 4HN</p>
        <p>Country: United Kingdom</p>
      </div>
    </div> -->
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

/* Content Section */
.content-section {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
}

.socials a {
  display: block;
}

/* Location Section */
.location-section {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  margin-top: 3rem;
}

.location-section img {
  max-height: 400px;
  object-fit: cover;
}
</style>