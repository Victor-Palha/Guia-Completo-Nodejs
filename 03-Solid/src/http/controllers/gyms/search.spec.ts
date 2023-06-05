import { app } from "@/app"
import {it, describe, afterAll, beforeAll, expect} from "vitest"
import request from "supertest"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"

describe("Search Gym (e2e)", async ()=>{
    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async ()=>{
        await app.close()
    })

    it("Should be able to Search a gym by title", async ()=>{
        
        const { token } = await createAndAuthenticateUser(app, true)

        
        await request(app.server).post("/gyms").set("Authorization", `Bearer ${token}`).send({
            title: "Javascript Gym",
            description: "The best gym to learn Javascript",
            phone: "123456789",
            latitude: -1.431854,
            longitude: -48.413569,
        })

        await request(app.server).post("/gyms").set("Authorization", `Bearer ${token}`).send({
            title: "Typescript Gym",
            description: "The best gym to learn Typescript",
            phone: "123456789",
            latitude: -1.431854,
            longitude: -48.413569,
        })

        const response = await request(app.server).get("/gyms/search").query({ query: "Javascript"}).set("Authorization", `Bearer ${token}`)
//        console.log(response.body)

        expect(response.statusCode).toBe(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: "Javascript Gym",
            })
        ])
    })
})