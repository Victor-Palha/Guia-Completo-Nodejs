import fastify from 'fastify'
import { knex } from './database'
import crypto from 'node:crypto'
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

app.get('/insert', async (req, res) => {
    const transactions = await knex('transactions')
        .insert({
            id: crypto.randomUUID(),
            title: 'Teste',
            amount: 1000,
        })
        .returning('*')

    return transactions
})

// Iniciando Servidor
app.listen({ port: env.PORT }).then(() => {
    console.log('Servidor rodando na porta 5000')
})
