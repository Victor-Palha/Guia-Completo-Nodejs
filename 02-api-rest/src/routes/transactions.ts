import { knex } from '../database'
import { z } from 'zod'
import { FastifyInstance } from 'fastify'
import crypto from 'node:crypto'

export async function transactionsRoutes(app: FastifyInstance) {
    app.post('/', async (req, res) => {
        const createTransactionSchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit']),
        })

        const { title, amount, type } = createTransactionSchema.parse(req.body)

        await knex('transactions').insert({
            id: crypto.randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1,
        })

        return res.status(201).send({ message: 'Transaction created' })
    })
    app.get('/', async (req, res) => {
        const transactions = await knex('transactions').select('*')
        return transactions
    })
}
