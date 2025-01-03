// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

// Import layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';

// Create and export the loading state
export const isLoading = ref(false);

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { 
        path: '', 
        name: 'Home', 
        component: () => import('@/views/HomePage.vue') 
      },
      { 
        path: 'about', 
        name: 'About', 
        component: () => import('@/views/AboutPage.vue') 
      },
      { 
        path: 'services', 
        name: 'Services', 
        component: () => import('@/views/ServicesPage.vue') 
      },
      { 
        path: 'contact', 
        name: 'Contact', 
        component: () => import('@/views/ContactPage.vue') 
      },
      { 
        path: 'login', 
        name: 'LogIn', 
        component: () => import('@/views/LoginPage.vue'),
        meta: { requiresGuest: true }
      },
      { 
        path: 'signup', 
        name: 'SignUp', 
        component: () => import('@/views/SignUp.vue'),
        meta: { requiresGuest: true }
      },
      { 
        path: 'knowledge', 
        name: 'Faq', 
        component: () => import('@/views/FaqPage.vue') 
      },
      { 
        path: 'forgot-password', 
        name: 'ForgotPassword', 
        component: () => import('@/views/ForgotPassword.vue'),
        meta: { requiresGuest: true }
      },
      { 
        path: 'about-you', 
        name: 'AboutYou', 
        component: () => import('@/views/KycPage.vue'), 
        meta: { requiresAuth: true } 
      },
      { 
        path: 'add-pension', 
        name: 'AddPension', 
        component: () => import('@/views/PensionPage.vue'), 
        meta: { requiresAuth: true } 
      },
      { 
        path: 'profile', 
        name: 'UserProfile', 
        component: () => import('@/views/UserProfile.vue'), 
        meta: { requiresAuth: true } 
      },
    ],
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      { 
        path: '', 
        name: 'Dashboard', 
        component: () => import('@/views/dashboard/DashboardHome.vue') 
      },
      { 
        path: 'admin-about-you', 
        name: 'AdminAboutYou', 
        component: () => import('@/views/KycPage.vue') 
      },
      { 
        path: 'admin-add-pension', 
        name: 'AdminAddPension', 
        component: () => import('@/views/PensionPage.vue') 
      },
      { 
        path: 'admin-profile', 
        name: 'AdminProfile', 
        component: () => import('@/views/UserProfile.vue') 
      },
    ],
  },
  // Catch-all route for undefined paths
  { 
    path: '/:pathMatch(.*)*', 
    redirect: '/' 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Scroll behavior
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

// Navigation guard
router.beforeEach(async (to, from, next) => {
  // Start loading
  isLoading.value = true;

  try {
    const authStore = useAuthStore();

    // Handle auth required routes
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!authStore.isLoggedIn) {
        next({
          name: 'LogIn',
          query: { redirect: to.fullPath }
        });
        return;
      }
    }

    // Handle guest-only routes (login, signup, forgot password)
    if (to.matched.some(record => record.meta.requiresGuest)) {
      if (authStore.isLoggedIn) {
        next({ name: 'UserProfile' });
        return;
      }
    }

    // Proceed with navigation
    next();
  } catch (error) {
    console.error('Navigation error:', error);
    next({ name: 'Home' });
  } finally {
    // Add a small delay to prevent flickering on fast loads
    setTimeout(() => {
      isLoading.value = false;
    }, 300);
  }
});

// After navigation complete
router.afterEach(() => {
  // Ensure loading is false after navigation
  setTimeout(() => {
    isLoading.value = false;
  }, 300);
});

export default router;