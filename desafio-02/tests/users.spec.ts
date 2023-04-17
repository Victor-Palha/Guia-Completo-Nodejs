import { it, beforeAll, afterAll, describe, beforeEach, expect } from 'vitest'
import  request  from 'supertest'
import { app } from '../src/app'
import { execSync } from 'child_process'

beforeAll(async () =>{
    await app.ready()
})
afterAll(async () => {
    await app.close()
})
beforeEach(() => {
    execSync('npx knex migrate:rollback --all')
    execSync('npx knex migrate:latest')
})

describe('User', () => {

    it('should be able to create a new user', async () => {
        await request(app.server).post('/users').send({
            username: 'teste',
            password: '123456'
        }).expect(201)
    })

    it('should be able to user login', async () => {
        await request(app.server).post('/users').send({
            username: 'teste',
            password: '123456'
        }).expect(201)

        await request(app.server).post('/users/login').send({
            username: 'teste',
            password: '123456'
        }).expect(200)
    })
})
describe('Diet', async () => {
    

    it('should be able to create a new diet item', async () => {
        await request(app.server).post('/users').send({
            username: 'teste',
            password: '123456'
        }).expect(201)

        const token = await request(app.server).post('/users/login').send({
            username: 'teste',
            password: '123456'  
        }).expect(200)
        //console.log(token.body.token)

        await request(app.server).post('/diet').set('Authorization', `Bearer ${token.body.token}`).send({
            name: "unhealthy food",
            description: "this is unhealthy food",
            date: "2021-10-10",
            time: "10:00",
            in_diet: false
        }).expect(201)
    })

    it('should be able to list all diet items', async () => {
        await request(app.server).post('/users').send({
            username: 'teste',
            password: '123456'
        }).expect(201)

        const token = await request(app.server).post('/users/login').send({
            username: 'teste',
            password: '123456'  
        }).expect(200)
        //console.log(token.body.token)

        await request(app.server).post('/diet').set('Authorization', `Bearer ${token.body.token}`).send({
            name: "unhealthy food",
            description: "this is unhealthy food",
            date: "2021-10-10",
            time: "10:00",
            in_diet: false
        }).expect(201)

        const allItens = await request(app.server).get('/diet').set('Authorization', `Bearer ${token.body.token}`).expect(200)
        //console.log(allItens.body.diet)
        expect(allItens.body.diet).toEqual([
            expect.objectContaining({
                name: "unhealthy food",
                description: "this is unhealthy food",
                date: "2021-10-10",
                time: "10:00",
                in_diet: 0
            })
        ])
    })

    it('should be able to get a diet item by id', async () => {
        await request(app.server).post('/users').send({
            username: 'teste',
            password: '123456'
        }).expect(201)

        const token = await request(app.server).post('/users/login').send({
            username: 'teste',
            password: '123456'  
        }).expect(200)
        //console.log(token.body.token)

        await request(app.server).post('/diet').set('Authorization', `Bearer ${token.body.token}`).send({
            name: "unhealthy food",
            description: "this is unhealthy food",
            date: "2021-10-10",
            time: "10:00",
            in_diet: false
        }).expect(201)

        const allItens = await request(app.server).get('/diet').set('Authorization', `Bearer ${token.body.token}`).expect(200)

        const item = await request(app.server).get(`/diet/${allItens.body.diet[0].id_item}`).set('Authorization', `Bearer ${token.body.token}`).expect(200)
        //console.log(allItens.body.diet)
        expect(item.body.item).toEqual([
            expect.objectContaining({
                name: "unhealthy food",
                description: "this is unhealthy food",
                date: "2021-10-10",
                time: "10:00",
                in_diet: 0
            })
        ])
    })

    it('should be able to delete a diet item', async () => {
        await request(app.server).post('/users').send({
            username: 'teste',
            password: '123456'
        }).expect(201)

        const token = await request(app.server).post('/users/login').send({
            username: 'teste',
            password: '123456'  
        }).expect(200)
        //console.log(token.body.token)

        await request(app.server).post('/diet').set('Authorization', `Bearer ${token.body.token}`).send({
            name: "unhealthy food",
            description: "this is unhealthy food",
            date: "2021-10-10",
            time: "10:00",
            in_diet: false
        }).expect(201)

        const allItens = await request(app.server).get('/diet').set('Authorization', `Bearer ${token.body.token}`).expect(200)

        await request(app.server).delete(`/diet/${allItens.body.diet[0].id_item}`).set('Authorization', `Bearer ${token.body.token}`).expect(200)
    })

    it('should be able to update a diet item', async () => {
        await request(app.server).post('/users').send({
            username: 'teste',
            password: '123456'
        }).expect(201)

        const token = await request(app.server).post('/users/login').send({
            username: 'teste',
            password: '123456'  
        }).expect(200)
        //console.log(token.body.token)

        await request(app.server).post('/diet').set('Authorization', `Bearer ${token.body.token}`).send({
            name: "unhealthy food",
            description: "this is unhealthy food",
            date: "2021-10-10",
            time: "10:00",
            in_diet: false
        }).expect(201)

        const allItens = await request(app.server).get('/diet').set('Authorization', `Bearer ${token.body.token}`).expect(200)

        await request(app.server).put(`/diet/${allItens.body.diet[0].id_item}`).set('Authorization', `Bearer ${token.body.token}`).send({
            name: "healthy food",
            description: "this is healthy food",
            date: "2021-10-10",
            time: "10:00",
            in_diet: true
        }).expect(200)

        const item = await request(app.server).get(`/diet/${allItens.body.diet[0].id_item}`).set('Authorization', `Bearer ${token.body.token}`).expect(200)

        expect(item.body.item).toEqual([
            expect.objectContaining({
                name: "healthy food",
                description: "this is healthy food",
                date: "2021-10-10",
                time: "10:00",
                in_diet: 1
            })
        ])
    })

    it('should be able to get the total of itens in diet', async () => {
        await request(app.server).post('/users').send({
            username: 'teste',
            password: '123456'
        }).expect(201)

        const token = await request(app.server).post('/users/login').send({
            username: 'teste',
            password: '123456'  
        }).expect(200)
        //console.log(token.body.token)

        await request(app.server).post('/diet').set('Authorization', `Bearer ${token.body.token}`).send({
            name: "unhealthy food",
            description: "this is unhealthy food",
            date: "2021-10-10",
            time: "10:00",
            in_diet: false
        }).expect(201)
        await request(app.server).post('/diet').set('Authorization', `Bearer ${token.body.token}`).send({
            name: "healthy food",
            description: "this is healthy food",
            date: "2021-10-10",
            time: "10:00",
            in_diet: true
        }).expect(201)

        const sum = await request(app.server).get('/diet/sum').set('Authorization', `Bearer ${token.body.token}`).expect(200)

        expect(sum.body).toEqual({
            total: 2
        })
    })

    it('shoul be able to get the total of healthy itens in diet', async () => {
        await request(app.server).post('/users').send({
            username: 'teste',
            password: '123456'
        }).expect(201)

        const token = await request(app.server).post('/users/login').send({
            username: 'teste',
            password: '123456'  
        }).expect(200)
        //console.log(token.body.token)

        await request(app.server).post('/diet').set('Authorization', `Bearer ${token.body.token}`).send({
            name: "healthy food",
            description: "this is healthy food",
            date: "2021-10-10",
            time: "10:00",
            in_diet: true
        }).expect(201)
        await request(app.server).post('/diet').set('Authorization', `Bearer ${token.body.token}`).send({
            name: "healthy food",
            description: "this is healthy food",
            date: "2021-10-10",
            time: "10:00",
            in_diet: true
        }).expect(201)

        const healthy = await request(app.server).get('/diet/healthy').set('Authorization', `Bearer ${token.body.token}`).expect(200)

        expect(healthy.body).toEqual({
            healthy: 2
        })
    })

    it('shoul be able to get the total of unhealthy itens in diet', async () => {
        await request(app.server).post('/users').send({
            username: 'teste',
            password: '123456'
        }).expect(201)

        const token = await request(app.server).post('/users/login').send({
            username: 'teste',
            password: '123456'  
        }).expect(200)
        //console.log(token.body.token)

        await request(app.server).post('/diet').set('Authorization', `Bearer ${token.body.token}`).send({
            name: "unhealthy food",
            description: "this is unhealthy food",
            date: "2021-10-10",
            time: "10:00",
            in_diet: false
        }).expect(201)
        await request(app.server).post('/diet').set('Authorization', `Bearer ${token.body.token}`).send({
            name: "unhealthy food",
            description: "this is unhealthy food",
            date: "2021-10-10",
            time: "10:00",
            in_diet: false
        }).expect(201)

        const unhealthy = await request(app.server).get('/diet/unhealthy').set('Authorization', `Bearer ${token.body.token}`).expect(200)

        expect(unhealthy.body).toEqual({
            unhealthy: 2
        })
    })

    it('should be able to get the best sequence of healthy food by day', async () => {
        await request(app.server).post('/users').send({
            username: 'teste',
            password: '123456'
        }).expect(201)

        const token = await request(app.server).post('/users/login').send({
            username: 'teste',
            password: '123456'  
        }).expect(200)
        //console.log(token.body.token)

        await request(app.server).post('/diet').set('Authorization', `Bearer ${token.body.token}`).send({
            name: "healthy food",
            description: "this is healthy food",
            date: "2021-10-10",
            time: "10:00",
            in_diet: true
        }).expect(201)
        await request(app.server).post('/diet').set('Authorization', `Bearer ${token.body.token}`).send({
            name: "healthy food",
            description: "this is healthy food",
            date: "2021-10-10",
            time: "10:00",
            in_diet: true
        }).expect(201)

        const healthy = await request(app.server).get('/diet/sequence').set('Authorization', `Bearer ${token.body.token}`).expect(200)

        expect(healthy.body).toEqual([
            expect.objectContaining({
                day: "2021-10-10",
                sequence: 2
            })
        ])
    })
})
