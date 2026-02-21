import approvaApi from '@/config/api/approva.api'
import type { User } from '../types/user.type'

type GetMeActionResponse =
  | {
      success: true
      data: User
    }
  | {
      success: false
      error: string
    }

export const getMeAction = async (): Promise<GetMeActionResponse> => {
  try {
    const { data } = await approvaApi.get<User>('/auth/me')

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      error: 'Something went wrong',
    }
  }
}
