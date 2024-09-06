import { createRouter, createWebHistory } from 'vue-router';
import Map from '@views/Map/Map.vue';

const routes = [
  {
    path: '/',
    redirect: '/map'
  },
  {
    path: '/map',
    name: 'map',
    component: Map,
  },
]

const router = createRouter({
  // 设置路由模式,发布需要后端配合。
  history: createWebHistory('/'),
  // 应该添加到路由的初始路由列表。
  routes: routes,
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})


export default router