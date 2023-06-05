import { app } from "@/app"
import {it, describe, afterAll, beforeAll, expect} from "vitest"
import request from "supertest"

describe("User token refresh (e2e)", async ()=>{
    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async ()=>{
        await app.close()
    })

    it("Should be able to refresh token", async ()=>{
        await request(app.server).post("/users").send({
            name: "John Doe",
            email: "joeDoe@teste.com",
            password: "123456"
        })

        const authResponse = await request(app.server).post("/sessions").send({
            email: "joeDoe@teste.com",
            password: "123456"
        })

        const cookies = authResponse.get("set-cookie")

        const response = await request(app.server).patch("/token/refresh").set("Cookie", cookies).send()

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
        expect(response.get("Set-Cookie")).toEqual([
            expect.stringContaining("refreshToken="),
        ])
    })
})