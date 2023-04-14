import { afterAll, beforeAll, test } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

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