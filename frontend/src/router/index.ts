import { authRoutes } from '@/modules/auth/routes'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [authRoutes],
})

export default router
