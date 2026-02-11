import type { User } from './user.type'

export interface LoginApiResponse {
  accessToken: string
  refreshToken: string
  user: User
}
