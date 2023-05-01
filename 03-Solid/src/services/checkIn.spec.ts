import { InMemoryCheckIn } from "@/repositories/in-memory/in-memory-check-in-repository"
import { beforeEach, describe, expect, it, afterEach, vi } from "vitest"
import { CheckInService } from "./checkInService"
import { randomUUID } from "node:crypto"

let inMemory: InMemoryCheckIn
let sut: CheckInService

describe("Auth service", () => {

    beforeEach(()=> {
        inMemory = new InMemoryCheckIn()
        sut = new CheckInService(inMemory)

        //set timer
        vi.useFakeTimers()
    })

    afterEach(()=>{
        //clear timer
        vi.clearAllTimers()
    })
    
    it("Should be able to create a new check in", async () => {

        const checkInData = {
            gym_id: randomUUID(),
            user_id: randomUUID(),
            validated_at: new Date()
        }

        const { checkIn } = await sut.execute(checkInData)

        expect(checkIn).toHaveProperty("id")
    })

    it("Should not be able to create 2 check-in on same day", async () => {

        vi.setSystemTime(new Date(2023, 7, 28, 10, 0, 0))
        const checkInData = {
            gym_id: randomUUID(),
            user_id: randomUUID(),
            validated_at: new Date()
        }

        const {checkIn} = await sut.execute(checkInData)
        console.log(checkIn.created_at)
        await expect(()=>
            sut.execute(checkInData)
        ).rejects.toBeInstanceOf(Error)
    })

    it("Should be able to create 2 check-in on different days", async () => {
        vi.setSystemTime(new Date(2023, 7, 27, 10, 0, 0))

        const checkInData = {
            gym_id: randomUUID(),
            user_id: randomUUID(),
            validated_at: new Date()
        }

        await sut.execute(checkInData)

        vi.setSystemTime(new Date(2023, 7, 28, 10, 0, 0))

        const {checkIn} = await sut.execute(checkInData)
        
        expect(checkIn).toHaveProperty("id")
    })

})