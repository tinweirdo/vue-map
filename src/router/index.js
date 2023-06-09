import { createRouter, createWebHashHistory } from 'vue-router';

import Map from '@mapVues/Map.vue';
import Login from '@views/Login/Login.vue';
import Home from '@views/Home.vue';

// set Login.vue as the default page
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/map',
    name: 'map',
    component: Map
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router