import { createRouter, createWebHashHistory } from 'vue-router';

import Map from '@map/Map.vue';
import Login from '@views/Login/Login.vue';
// set Login.vue as the default page
const routes = [
  {
    path: '/',
    redirect: '/map'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/map',
    name: 'map',
    component: Map,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router