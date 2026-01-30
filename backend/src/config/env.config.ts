import z from 'zod';
import { envSchema } from './env.schema';

export const validateEnv = () => {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const flattenedErrors = z.flattenError(parsed.error);
    console.error('Invalid environment variables');
    console.error(flattenedErrors);

    throw new Error('Invalid environment variables');
  }

  return parsed.data;
};
