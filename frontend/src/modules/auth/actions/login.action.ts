import approvaApi from '@/config/api/approva.api'
import type { LoginApiResponse } from '../types/login-api-response.type'
import { isAxiosError } from 'axios'

type LoginActionResponse =
  | {
      success: true
      data: LoginApiResponse
    }
  | {
      success: false
      error: string
    }

export const loginAction = async (
  email: string,
  password: string,
): Promise<LoginActionResponse> => {
  try {
    const { data } = await approvaApi.post<LoginApiResponse>('/auth/login', { email, password })

    return {
      success: true,
      data,
    }
  } catch (error) {
    if (isAxiosError(error) && error.status === 401) {
      return {
        success: false,
        error: 'Invalid credentials',
      }
    }

    return {
      success: false,
      error: 'Something went wrong',
    }
  }
}
