import { createRouter, createWebHashHistory } from 'vue-router'
import App from '@/App.vue';

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/home',
      name: 'home',
      component: App
    },
  ]
})

export default router