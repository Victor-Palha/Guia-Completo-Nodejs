import { app } from "@/app"
import {it, describe, afterAll, beforeAll, expect} from "vitest"
import request from "supertest"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"
import { prisma } from "@/lib/prisma"

describe("Check-in metrics (e2e)", async ()=>{
    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async ()=>{
        await app.close()
    })

    it("Should be able to get the total count of check-ins", async ()=>{
        
        const { token } = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
            data: {
                title: "Javascript Gym",
                description: "The best gym to learn Javascript",
                phone: "123456789",
                latitude: -1.431854,
                longitude: -48.413569,
            }
        })

        await prisma.checkIn.createMany({
            data: [{
                gym_id: gym.id,
                user_id: user.id,
            },{
                gym_id: gym.id,
                user_id: user.id,
            }]
        })

        
        // eslint-disable-next-line quotes
        const response = await request(app.server).get("/check-ins/metrics").set("Authorization", `Bearer ${token}`).send()

        //console.log(response.body)

        expect(response.statusCode).toBe(200)
        expect(response.body.totalCheckIns).toBe(2)
    })
})