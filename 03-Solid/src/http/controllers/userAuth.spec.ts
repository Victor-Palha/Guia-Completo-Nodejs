import { app } from "@/app"
import {it, describe, afterAll, beforeAll, expect} from "vitest"
import request from "supertest"

describe("User Auth (e2e)", async ()=>{
    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async ()=>{
        await app.close()
    })

    it("Should be able to authenticate a user", async ()=>{
        await request(app.server).post("/users").send({
            name: "John Doe",
            email: "joeDoe@teste.com",
            password: "123456"
        })

        const response = await request(app.server).post("/sessions").send({
            email: "joeDoe@teste.com",
            password: "123456"
        })

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
    })
})