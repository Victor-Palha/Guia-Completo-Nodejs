import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
    config({ path: '.env.test' })
} else {
    config()
}

const envSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
    DATABASE_CLIENT: z.string(),
    DATABASE_URL: z.string(),
    PORT: z.coerce.number().default(5000),
})

export const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    throw new Error('Invalid env')
}

export const env = _env.data
