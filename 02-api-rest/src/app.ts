import fastify from 'fastify'
import { transactionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'
// Iniciando APP
export const app = fastify()

// Middlewares
app.register(cookie)

// Rotas
app.register(transactionsRoutes, {
    prefix: '/transactions',
})
