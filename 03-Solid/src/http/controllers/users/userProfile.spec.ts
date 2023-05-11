import { app } from "@/app"
import {it, describe, afterAll, beforeAll, expect} from "vitest"
import request from "supertest"

describe("User Profile (e2e)", async ()=>{
    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async ()=>{
        await app.close()
    })

    it("Should be able to get user profile", async ()=>{
        await request(app.server).post("/users").send({
            name: "John Doe",
            email: "joeDoe@teste.com",
            password: "123456"
        })

        const authResponse = await request(app.server).post("/sessions").send({
            email: "joeDoe@teste.com",
            password: "123456"
        })

        const { token } = authResponse.body
        
        const profileResponse = await request(app.server).get("/me").set("Authorization", `Bearer ${token}`)

        expect(profileResponse.statusCode).toBe(200)
        expect(profileResponse.body.user).toEqual(expect.objectContaining({
            email: "joeDoe@teste.com"
        }))

    })
})