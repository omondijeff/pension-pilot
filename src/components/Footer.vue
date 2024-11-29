<template>
  <footer class="bg-white text-gray-800 py-8">
    <div class="container mx-auto px-6 lg:px-16">
      <!-- Footer Content Wrapper -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        
        <!-- About Section -->
        <div>
          <h3 class="text-xl font-semibold mb-4">About PensionPilot</h3>
          <p class="text-sm leading-relaxed">
            PensionPilot helps you secure your future with easy and reliable pension management tools. We're committed to helping individuals navigate their pension journeys with transparency and ease.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-xl font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li><a href="/about" class="hover:text-primary transition-colors duration-200">Why PensionPilot</a></li>
            <li><a href="/services" class="hover:text-primary transition-colors duration-200">Help & Knowledge</a></li>
            <li><a href="/contact" class="hover:text-primary transition-colors duration-200">Contact Us</a></li>
          </ul>
        </div>

        <!-- Contact Section -->
        <div>
          <h3 class="text-xl font-semibold mb-4">Contact Us</h3>
          <p class="text-sm leading-relaxed">Email: <a href="mailto:support@pensionpilot.com" class="text-primary hover:text-gray-600">support@pensionpilot.com</a></p>
          <p class="text-sm leading-relaxed">Phone: <a href="tel:+1234567890" class="text-primary hover:text-gray-600">+1 (234) 567-890</a></p>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="mt-12 text-center">
        <p class="text-sm">&copy; 2024 Pension Pilot. All rights reserved.</p>
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
// Ensure you have the FontAwesome icons available for the social links.
// You can add the following in your index.html head tag:
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</script>

<style scoped>
/* Apply the Gilroy font to the entire footer */
footer {
  font-family: 'Gilroy', sans-serif;
  background-color: #ffffff; /* Ensures the footer stays white */
}

/* Hover effects for links */
a:hover {
  text-decoration: underline;
}

/* Social media icon styling */
.fab {
  font-size: 1.25rem;
}

/* Primary color class for text */
.text-primary {
  color: #4569ae;
}
</style>
