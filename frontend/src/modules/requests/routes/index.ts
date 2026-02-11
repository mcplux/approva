import type { RouteRecordRaw } from 'vue-router'

export const requestsRoutes: RouteRecordRaw = {
  path: '/requests',
  children: [
    {
      path: '',
      name: 'requests',
      component: () => import('../views/RequestsView.vue'),
    },
  ],
}
