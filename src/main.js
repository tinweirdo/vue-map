import Layui from '@layui/layui-vue'
import { createApp } from 'vue'
import App from './App.vue'

import '@layui/layui-vue/lib/index.css'
import '@/assets/leaflet.css'

const app = createApp(App);
app.use(Layui);
app.mount('#app');