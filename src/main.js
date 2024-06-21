
import { createApp } from 'vue';
import App from '@/App.vue';
import router from "@/router";

// 引入 element 样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './style.css';
import '@/assets/leaflet.css';
import '@/assets/common/fonts/font.css';//引入特殊字体

const app = createApp(App);

app.use(router); // 引用路由实例
app.use(ElementPlus)

app.mount('#app');

app.provide('app', app)

