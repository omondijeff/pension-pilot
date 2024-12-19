// src/router/index.ts
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
        path: '', // This is for the home page
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
        path: 'profile',
        name: 'UserProfile',
        component: () => import('@/views/UserProfile.vue')
      },
    ]
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
        path: 'about-you',
        name: 'AboutYou',
        component: () => import('@/views/KycPage.vue')
      },
      {
        path: 'add-pension',
        name: 'AddPension',
        component: () => import('@/views/PensionPage.vue')
      },
      {
        path: 'admin-profile',
        name: 'UserProfile',
        component: () => import('@/views/UserProfile.vue')
      },
    ]
  },
  // Catch-all route for undefined paths
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isLoggedIn) {
    next({ name: 'LogIn' });
  } else {
    next();
  }
});

export default router;
