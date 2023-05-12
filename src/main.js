import Layui from '@layui/layui-vue'
import { createApp } from 'vue'
import router from "@/router";
import App from '@/App.vue'

import '@layui/layui-vue/lib/index.css'
import '@/assets/leaflet.css'
import '@/assets/common/fonts/font.css'//引入特殊字体

const app = createApp(App);
app.use(Layui);
app.use(router); // 引用路由实例

app.mount('#app');