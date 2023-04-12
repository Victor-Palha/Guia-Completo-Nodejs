import { knex } from '../database'
import { FastifyInstance } from 'fastify'

export async function transactions(app: FastifyInstance) {
    app.get('/select', async (req, res) => {
        const transactions = await knex('transactions').select('*')
        return transactions
    })
}
