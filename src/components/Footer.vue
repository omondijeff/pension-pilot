<template>
  <footer class="bg-white text-gray-800 py-8">
    <div class="container mx-auto px-6 lg:px-16">
      <!-- Footer Content Wrapper -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
        
    <!-- About Section -->
<div>
  
  <img src="@/assets/footer-logo.png" alt="PensionPilot Logo" class="mb-4 mx-auto md:mx-0 w-32 h-auto" />
  <p class="text-sm leading-relaxed font-gilroy-light">
    PensionPilot helps you secure your future with easy and reliable pension management tools. We're committed to helping individuals navigate their pension journeys with transparency and ease.
  </p>
</div>


        <!-- Quick Links -->
        <div>
          <h3 class="text-xl font-gilroy-bold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li><a href="/about" class="hover:text-primary transition-colors duration-200 font-gilroy-light">Why PensionPilot</a></li>
            <li><a href="/services" class="hover:text-primary transition-colors duration-200 font-gilroy-light">Help & Knowledge</a></li>
            <li><a href="/contact" class="hover:text-primary transition-colors duration-200 font-gilroy-light">Contact Us</a></li>
          </ul>
        </div>

        <!-- Contact Section -->
        <div>
          <h3 class="text-xl font-gilroy-bold mb-4">Contact Us</h3>
          <p class="text-sm leading-relaxed font-gilroy-light">
            Email: <a href="mailto:support@pensionpilot.com" class="text-primary hover:text-gray-600">support@pensionpilot.com</a>
          </p>
          <p class="text-sm leading-relaxed font-gilroy-light">
            Phone: <a href="tel:+1234567890" class="text-primary hover:text-gray-600">+1 (234) 567-890</a>
          </p>
        </div>

        <!-- Mailing Subscription -->
        <div>
          <h3 class="text-xl font-gilroy-bold mb-4">Stay Updated</h3>
          <p class="text-sm leading-relaxed font-gilroy-light mb-4">
            Subscribe to our mailing list for updates and tips on managing your pension.
          </p>
          <form @submit.prevent="handleSubscription" class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2">
  <input
    type="email"
    v-model="subscriberEmail"
    placeholder="Enter your email"
    class="w-full p-3 border border-gray-300 rounded-lg md:flex-1 font-gilroy-light"
    required
  />
  <button
    type="submit"
    class="w-full md:w-auto py-3 bg-gradient-to-r from-[#4569AE] to-[#3F9FD7] text-white rounded-lg font-gilroy-bold hover:opacity-90"
  >
    Subscribe
  </button>
</form>

        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="mt-12 text-center">
        <p class="text-sm font-gilroy-light">&copy; 2024 PensionPilot. All rights reserved.</p>
        <div class="mt-4 space-x-6">
          <a href="#" class="text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Data for the subscription form
let subscriberEmail = '';

// Handle the subscription form submission
const handleSubscription = () => {
  if (subscriberEmail) {
    console.log("Subscribed with email:", subscriberEmail);
    alert("Thank you for subscribing!");
    subscriberEmail = ''; // Clear the input after submission
  } else {
    alert("Please enter a valid email address.");
  }
};
</script>

<style scoped>
/* Social media icon styling */
.fab {
  font-size: 1.25rem;
}

/* Primary color for text links */
.text-primary {
  color: #4569ae;
}

/* Hover effects for links */
a:hover {
  text-decoration: underline;
}
</style>
