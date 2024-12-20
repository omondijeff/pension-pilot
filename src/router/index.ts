import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

// Import layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';

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
        component: () => import('@/views/LoginPage.vue') 
      },
      { 
        path: 'signup', 
        name: 'SignUp', 
        component: () => import('@/views/SignUp.vue') 
      },
      { 
        path: 'knowledge', 
        name: 'Faq', 
        component: () => import('@/views/FaqPage.vue') 
      },
      { 
        path: 'forgot-password', 
        name: 'ForgotPassword', 
        component: () => import('@/views/ForgotPassword.vue') 
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
});

// Navigation guard
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // If not logged in, redirect to login
    if (!authStore.isLoggedIn) {
      next({ name: 'LogIn', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
