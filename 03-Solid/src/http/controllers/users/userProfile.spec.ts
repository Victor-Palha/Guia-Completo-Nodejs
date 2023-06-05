import { app } from "@/app"
import {it, describe, afterAll, beforeAll, expect} from "vitest"
import request from "supertest"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"

describe("User Profile (e2e)", async ()=>{
    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async ()=>{
        await app.close()
    })

    it("Should be able to get user profile", async ()=>{
        const { token } = await createAndAuthenticateUser(app)

        
        const profileResponse = await request(app.server).get("/me").set("Authorization", `Bearer ${token}`)

        expect(profileResponse.statusCode).toBe(200)
        expect(profileResponse.body.user).toEqual(expect.objectContaining({
            email: "joeDoe@teste.com"
        }))

    })
})