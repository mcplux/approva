import type { User } from '@/modules/auth/types/user.type'

export interface Request {
  id: number
  title: string
  description: string
  type: string
  status: string
  createdAt: Date
  updatedAt: Date
  createdBy: User
}
