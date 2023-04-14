import { afterAll, beforeAll, test, describe, expect, beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
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

    beforeEach(() => {
        // Criando banco de dados de teste
        execSync('npx knex migrate:rollback --all')
        execSync('npx knex migrate:latest')
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

    // iniciando teste de transação específica
    test('Get specific Transaction', async () => {
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

        // Pegando id da transação
        const { id } = listTransactionsResponse.body.transactions[0]

        // Pegando transação específica
        const specificTransactionResponse = await request(app.server)
            .get(`/transactions/${id}`)
            .set('Cookie', cookie)
            .expect(200)

        // verificando resultado esperado
        expect(specificTransactionResponse.body.transactions).toEqual(
            expect.objectContaining({
                title: 'New Transaction',
                amount: 100,
            }),
        )
    })

    // iniciando teste de sumário de transações
    test('Get summary of Transactions', async () => {
        // Criando nova transição
        const responseTransactions = await request(app.server)
            .post('/transactions')
            .send({
                title: 'New Transaction',
                amount: 1000,
                type: 'credit',
            })

        // Pegando cookie

        const cookie = responseTransactions.headers['set-cookie']

        // Criando outra transação
        await request(app.server)
            .post('/transactions')
            .set('Cookie', cookie)
            .send({
                title: 'Debit Transaction',
                amount: 400,
                type: 'debit',
            })

        // Pegando todas as transações e passando o cookie
        const listTransactionsSummary = await request(app.server)
            .get('/transactions/summary')
            .set('Cookie', cookie)
            .expect(200)

        // verificando resultado esperado
        expect(listTransactionsSummary.body.summary).toEqual(
            expect.objectContaining({
                amount: 600,
            }),
        )
    })
})
