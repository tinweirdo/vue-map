import { createApp } from 'vue'
import './style/leaflet.css'
import App from './App.vue';
import map from './map'

const app = createApp(App);
app.mount('#app');
app.config.globalProperties.$map = map;
