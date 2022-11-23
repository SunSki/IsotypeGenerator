import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Isotype from '../components/IsotypeDouble.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: Isotype
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
