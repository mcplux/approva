import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string({ message: 'Invalid email' }).email('Invalid email'),
  password: z.string({ message: 'Password is required' }).min(1, 'Password is required'),
})

export type loginForm = z.infer<typeof loginSchema>
