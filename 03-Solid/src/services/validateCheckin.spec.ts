import { InMemoryCheckIn } from "@/repositories/in-memory/in-memory-check-in-repository"
import { beforeEach, describe, expect, it, afterEach, vi } from "vitest"
import { ValidateCheckInService } from "./validateCheckInService"
import { ResourceNotFound } from "./errors/resource-not-found"

let inMemory: InMemoryCheckIn
let sut: ValidateCheckInService

describe("validade Check-ins", () => {

    beforeEach(()=> {
        inMemory = new InMemoryCheckIn()

        sut = new ValidateCheckInService(inMemory)

        //set timer
        vi.useFakeTimers()
    })

    afterEach(()=>{
        //clear timer
        vi.clearAllTimers()
    })
    
    it("Should be able to validate check-in", async () => {
        const newCheckIn = await inMemory.create({
            gym_id: "gym_1",
            user_id: "user_1",
        })

        const {checkIn} = await sut.execute({
            checkIn_id: newCheckIn.id
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(inMemory.items[0].validated_at).toEqual(expect.any(Date))
    })

    it("Should not be able to validate an inexistent check-in", async () => {
        await expect(()=>
            sut.execute({
                checkIn_id: "invalid_check_in_id"
            })
        ).rejects.toBeInstanceOf(ResourceNotFound)
    })

    it("should not be able to validate a check-in after 20 minutes", async ()=>{
        vi.setSystemTime(new Date(2023, 0, 1, 13, 40))
        const newCheckIn = await inMemory.create({
            gym_id: "gym_1",
            user_id: "user_1",
        })

        const twentyOneMinutesLater = 21 * 60 * 1000
        vi.advanceTimersByTime(twentyOneMinutesLater)

        await expect(()=>
            sut.execute({
                checkIn_id: newCheckIn.id
            })
        ).rejects.toBeInstanceOf(Error)
    })
})