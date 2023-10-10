
import { createApp } from 'vue';
import App from '@/App.vue';
import router from "@/router";
import proj4leaflet from 'proj4leaflet'


import Layui from '@layui/layui-vue';

import '@layui/layui-vue/lib/index.css';
import '@/assets/leaflet.css';
import '@/assets/common/fonts/font.css';//引入特殊字体
import 'view-ui-plus/dist/styles/viewuiplus.css';

const app = createApp(App);

app.provide('app', app)

app.use(Layui);
app.use(router); // 引用路由实例

app.mount('#app');
