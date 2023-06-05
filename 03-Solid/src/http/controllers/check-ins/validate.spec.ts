import { app } from "@/app"
import {it, describe, afterAll, beforeAll, expect} from "vitest"
import request from "supertest"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"
import { prisma } from "@/lib/prisma"

describe("validate check-in (e2e)", async ()=>{
    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async ()=>{
        await app.close()
    })

    it("Should be able to validate a check-in", async ()=>{
        
        const { token } = await createAndAuthenticateUser(app, true)

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

        let checkIn = await prisma.checkIn.create({
            data: {
                gym_id: gym.id,
                user_id: user.id,
            }
        })

        
        // eslint-disable-next-line quotes
        const response = await request(app.server).patch(`/check-ins/${checkIn.id}/validate`).set("Authorization", `Bearer ${token}`).send()

        expect(response.statusCode).toBe(204)

        checkIn = await prisma.checkIn.findFirstOrThrow({
            where:{
                id: checkIn.id
            }
        })
        
        expect(checkIn.validated_at).toEqual(expect.any(Date))
    })
})