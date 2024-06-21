import { createRouter, createWebHashHistory } from 'vue-router';

import Map from '@views/Map/Map.vue';
// set Login.vue as the default page
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
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {

})

export default router