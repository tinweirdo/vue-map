import { createRouter, createWebHashHistory } from 'vue-router'
import Map2d from '@/views/Map2d.vue';
import Map3d from '@/views/Map3d.vue';

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/map2d'
    },
    {
      path: '/map2d',
      name: 'map2d',
      component: Map2d
    },
    {
      path: '/map3d',
      name: 'map3d',
      component: Map3d
    },
  ]
})

// router.addRoute({ path: '/', redirect: '/map2d' })

export default router