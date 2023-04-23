import 'dotenv/config'
import {z} from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(5000)
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false){
    console.log('Invalid Environment variables '+_env.error.format())
    throw new Error('Invalid Environment variables')
}

export const env = _env.data