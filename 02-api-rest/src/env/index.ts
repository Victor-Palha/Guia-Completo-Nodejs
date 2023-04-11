import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    DATABASE_CLIENT: z.string(),
    DATABASE_URL: z.string(),
    PORT: z.number().default(5000),
})

export const env = envSchema.parse(process.env)
