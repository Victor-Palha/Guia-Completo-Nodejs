import { afterAll, beforeAll, test, describe, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

// Testes de Transações
describe('Transactions', () => {
    // Antes de todos os testes espero que o app esteja pronto
    beforeAll(async () => {
        await app.ready()
    })

    // Depois de todos os testes fechamos o servidor
    afterAll(async () => {
        await app.close()
    })

    //  Iniciando teste
    test('Create new Transaction', async () => {
        // Criando servidor e setando rota e json
        await request(app.server)
            .post('/transactions')
            .send({
                title: 'New Transaction',
                amount: 100,
                type: 'credit',
            })
            // esperando status 201
            .expect(201)
    })
    // iniciando teste
    test('Get all Transactions', async () => {
        // Criando nova transição
        const responseTransactions = await request(app.server)
            .post('/transactions')
            .send({
                title: 'New Transaction',
                amount: 100,
                type: 'credit',
            })
        // Pegando cookie
        const cookie = responseTransactions.headers['set-cookie']
        // Pegando todas as transações e passando o cookie
        const listTransactionsResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookie)
            .expect(200)
        // verificando resultado esperado
        expect(listTransactionsResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: 'New Transaction',
                amount: 100,
            }),
        ])
    })
})
