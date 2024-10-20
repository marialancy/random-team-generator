import { createRouter, createWebHistory } from 'vue-router'
import TeamGenerator from '../views/TeamGenerator.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TeamGenerator
    }
  ]
})

export default router