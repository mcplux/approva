import { createRouter, createWebHistory } from 'vue-router'

import { authRoutes } from '@/modules/auth/routes'
import AppLayout from '@/modules/common/layouts/AppLayout.vue'
import { requestsRoutes } from '@/modules/requests/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: AppLayout,
      children: [requestsRoutes],
    },
    authRoutes,
  ],
})

export default router
