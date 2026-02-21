import { z } from 'zod'

export const createRequestSchema = z.object({
  title: z.string().min(3),
  description: z.string(),
  type: z.enum(['vacation', 'purchase', 'generic']),
})
