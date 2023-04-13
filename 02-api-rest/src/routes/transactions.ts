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
        // session_id is a cookie
        let sessionId = req.cookies.session_id

        if (!sessionId) {
            sessionId = crypto.randomUUID()

            res.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
            })
        }

        await knex('transactions').insert({
            id: crypto.randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1,
            session_id: sessionId,
        })

        return res.status(201).send({ message: 'Transaction created' })
    })

    app.get('/', async (req, res) => {
        const transactions = await knex('transactions').select()

        return res.status(200).send({ transactions })
    })

    app.get('/:id', async (req, res) => {
        const getTransactionSchema = z.object({
            id: z.string().uuid(),
        })
        const { id } = getTransactionSchema.parse(req.params)
        console.log(id)

        const transactions = await knex('transactions').where('id', id).first()

        return res.status(200).send({ transactions })
    })

    app.get('/summary', async (req, res) => {
        const summary = await knex('transactions')
            .sum('amount', { as: 'amount' })
            .first()

        return res.status(200).send({ summary })
    })
}
