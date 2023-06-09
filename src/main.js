import Layui from '@layui/layui-vue'
import ElementPlus from 'element-plus';

import { createApp } from 'vue'
import router from "@/router";
import App from '@/App.vue';

import '@layui/layui-vue/lib/index.css';
import '@/assets/leaflet.css';
import '@/assets/common/fonts/font.css'//引入特殊字体
import 'element-plus/dist/index.css';
import 'element-plus/dist/index.full.min.js';

const app = createApp(App);

app.provide('app', app)

app.use(Layui);
app.use(router); // 引用路由实例
app.use(ElementPlus);

app.mount('#app');
