import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/styles/main.css';

// Create Vue application instance
const app = createApp(App);

// Create Pinia store instance
const pinia = createPinia();

// Install plugins
app.use(pinia);  // State management
app.use(router); // Router

// Mount the app
app.mount('#app');