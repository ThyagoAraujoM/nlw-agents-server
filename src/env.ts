import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(333),
  DATABASE_URL: z.url().startsWith('postgresql://'),
});

export const env = envSchema.parse(process.env);
