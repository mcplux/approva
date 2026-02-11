import type { RouteRecordRaw } from 'vue-router'
import AuthLayout from '../layouts/AuthLayout.vue'
import LoginView from '../views/LoginView.vue'

export const authRoutes: RouteRecordRaw = {
  path: '',
  component: AuthLayout,
  children: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
}
