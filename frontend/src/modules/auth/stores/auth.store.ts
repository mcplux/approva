import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { User } from '../types/user.type'
import { loginAction } from '../actions/login.action'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  const login = async (email: string, password: string) => {
    const response = await loginAction(email, password)
    if (!response.success) {
      return response
    }

    const { data } = response
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    user.value = data.user

    return response
  }
  return {
    login,
  }
})
