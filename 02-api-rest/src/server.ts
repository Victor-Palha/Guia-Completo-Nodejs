import fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'

// Iniciando APP
const app = fastify()

// Middlewares
app.register(cookie)

// Rotas
app.register(transactionsRoutes, {
    prefix: '/transactions',
})

// Iniciando Servidor
app.listen({ port: env.PORT }).then(() => {
    console.log('Servidor rodando na porta 5000')
})
