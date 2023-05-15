import { app } from "@/app"
import {it, describe, afterAll, beforeAll, expect} from "vitest"
import request from "supertest"
import { createAndAuthenticateUser } from "@/lib/test/create-and-authenticate-user"

describe("Create Gym (e2e)", async ()=>{
    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async ()=>{
        await app.close()
    })

    it("Should be able to create a gym", async ()=>{
        
        const { token } = await createAndAuthenticateUser(app)

        
        const response = await request(app.server).post("/gyms").set("Authorization", `Bearer ${token}`).send({
            title: "Javascript Gym",
            description: "The best gym to learn Javascript",
            phone: "123456789",
            latitude: -1.431854,
            longitude: -48.413569,
        })

        expect(response.statusCode).toBe(201)
    })
})