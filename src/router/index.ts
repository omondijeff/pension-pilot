import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth'; // Import the auth store

// Lazy-load route components for better performance
const HomePage = () => import('@/views/HomePage.vue');
const AboutPage = () => import('@/views/AboutPage.vue');
const ServicesPage = () => import('@/views/ServicesPage.vue');
const ContactPage = () => import('@/views/ContactPage.vue');
const LoginPage = () => import('@/views/LoginPage.vue');
const SignUpPage = () => import('@/views/SignUp.vue');
const ForgotPassword = () => import('@/views/ForgotPassword.vue');
const KycPage = () => import('@/views/KycPage.vue');
const PensionPage = () => import('@/views/PensionPage.vue');
const UserProfile = () => import('@/views/UserProfile.vue');

// Define routes
const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/services', name: 'Services', component: ServicesPage },
  { path: '/contact', name: 'Contact', component: ContactPage },
  { path: '/login', name: 'LogIn', component: LoginPage },
  { path: '/signup', name: 'SignUp', component: SignUpPage },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword },
  {
    path: '/about-you',
    name: 'AboutYou',
    component: KycPage,
    meta: { requiresAuth: true }, // Requires authentication
  },
  {
    path: '/add-pension',
    name: 'AddPension',
    component: PensionPage,
    meta: { requiresAuth: true }, // Requires authentication
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    meta: { requiresAuth: true }, // Requires authentication
  },
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to check authentication
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  // Log the route being accessed and the authentication status
  console.log('Navigating to:', to.name);
  console.log('User authentication status:', authStore.isLoggedIn);

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    // Log the redirect action for debugging
    console.log('User not authenticated, redirecting to login page');

    // Show an alert to the user (for debugging purposes)
    alert('You need to be logged in to access this page.');

    // Redirect to the login page
    next({ name: 'LogIn' });
  } else {
    // Proceed to the route
    next();
  }
});

export default router;
