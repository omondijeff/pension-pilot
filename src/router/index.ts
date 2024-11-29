import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import AboutPage from '@/views/AboutPage.vue';
import ServicesPage from '@/views/ServicesPage.vue';
import ContactPage from '@/views/ContactPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import SignUpPage from '@/views/SignUp.vue';
import ForgotPassword from '@/views/ForgotPassword.vue';
import KycPage from '@/views/KycPage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/services', name: 'Services', component: ServicesPage },
  { path: '/contact', name: 'Contact', component: ContactPage },
  { path: '/login', name: 'LogIn', component: LoginPage },
  { path: '/signup', name: 'SignUp', component: SignUpPage },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword },
  { path: '/about-you', name: 'AboutYou', component: KycPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
