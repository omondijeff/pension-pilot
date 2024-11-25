import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router); // Don't forget to use the router
app.mount('#app');
