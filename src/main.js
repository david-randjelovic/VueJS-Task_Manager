import { createApp } from 'vue'
import App from './App.vue'
import primevuePlugin from './primevue-plugin';
import router from './router';

const app = createApp(App);
app.use(router);
app.use(primevuePlugin);
app.mount('#app');
