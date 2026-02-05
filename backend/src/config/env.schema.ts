import { z } from 'zod';
import { StringValue } from 'ms';

const timeSpanRegex = /^(\d+)(ms|s|m|h|d|w|y)$/;

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),

  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.coerce.number(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),

  JWT_ACCESS_SECRET: z.string().min(20),
  JWT_ACCESS_EXPIRES_IN: z
    .string()
    .default('15m')
    .refine((val): val is StringValue => timeSpanRegex.test(val), {
      error: 'Invalid time span format',
    }),
  JWT_REFRESH_SECRET: z.string().min(20),
  JWT_REFRESH_EXPIRES_IN: z
    .string()
    .default('15m')
    .refine((val): val is StringValue => timeSpanRegex.test(val), {
      error: 'Invalid time span format',
    }),
});

export type Env = z.infer<typeof envSchema>;
