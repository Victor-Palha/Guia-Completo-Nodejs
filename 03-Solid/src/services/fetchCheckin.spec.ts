import { beforeEach, describe, expect, it } from "vitest"
import { FetchCheckinService } from "./fetchCheckinService"
import { InMemoryCheckIn } from "@/repositories/in-memory/in-memory-check-in-repository"


let inMemoryCheckIn: InMemoryCheckIn
let sut: FetchCheckinService
describe("Fetch user checkins history", () => {

    beforeEach(async ()=>{
        inMemoryCheckIn = new InMemoryCheckIn()
        sut = new FetchCheckinService(inMemoryCheckIn)
    })

    it("Should be able to fetch checkins", async ()=>{
        await inMemoryCheckIn.create({
            gym_id: "gym_01",
            user_id: "user_01",
            created_at: new Date(),
            validated_at: new Date()
        })

        await inMemoryCheckIn.create({
            gym_id: "gym_02",
            user_id: "user_01",
            created_at: new Date(),
            validated_at: new Date()
        })

        const {checkIns} = await sut.execute({user_id: "user_01", page: 1})

        expect(checkIns.length).toBe(2)
        expect(checkIns).toEqual([
            expect.objectContaining({gym_id: "gym_01"}),
            expect.objectContaining({gym_id: "gym_02"})
        ])
    })

    it("Should be able to fetch paginated checkins", async ()=>{
        for (let index = 1; index <= 22; index++) {
            await inMemoryCheckIn.create({
                gym_id: `gym_${index}`,
                user_id: "user_01",
                created_at: new Date(),
                validated_at: new Date()
            })
        }

        const {checkIns} = await sut.execute({user_id: "user_01", page: 2})
        expect(checkIns.length).toBe(2)
        expect(checkIns).toEqual([
            expect.objectContaining({gym_id: "gym_21"}),
            expect.objectContaining({gym_id: "gym_22"})
        ])
    })
})