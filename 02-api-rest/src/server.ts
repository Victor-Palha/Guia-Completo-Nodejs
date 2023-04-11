import fastify from 'fastify'
import { knex } from './database'
import crypto from 'node:crypto'
import { env } from './env'

// Iniciando APP
const app = fastify()

// Rotas
app.get('/', async (req, res) => {
    return { message: 'Hello World' }
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

app.get('/select', async (req, res) => {
    const transactions = await knex('transactions').select('*')
    return transactions
})

// Iniciando Servidor
app.listen({ port: env.PORT }).then(() => {
    console.log('Servidor rodando na porta 5000')
})
