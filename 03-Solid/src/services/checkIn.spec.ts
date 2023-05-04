import { InMemoryCheckIn } from "@/repositories/in-memory/in-memory-check-in-repository"
import { beforeEach, describe, expect, it, afterEach, vi } from "vitest"
import { CheckInService } from "./checkInService"
import { randomUUID } from "node:crypto"
import { InMemoryGyms } from "@/repositories/in-memory/in-memory-gyms-repository"
import { Decimal } from "@prisma/client/runtime"

let inMemory: InMemoryCheckIn
let sut: CheckInService
let inMemoryGym: InMemoryGyms

describe("Check-ins", () => {

    beforeEach(()=> {
        inMemory = new InMemoryCheckIn()
        inMemoryGym = new InMemoryGyms()
        sut = new CheckInService(inMemory, inMemoryGym)

        inMemoryGym.create({
            id: "gym_1",
            title: "JS/TS GYM",
            description: "The best gym for JS/TS developers",
            phone: "123456789",
            latitude: new Decimal(0),
            longitude: new Decimal(0),
        })

        //set timer
        vi.useFakeTimers()
    })

    afterEach(()=>{
        //clear timer
        vi.clearAllTimers()
    })
    
    it("Should be able to create a new check in", async () => {

        const checkInData = {
            gym_id: "gym_1",
            user_id: randomUUID(),
            validated_at: new Date(),
            userLatitude: 0,
            userLongitude: 0
        }

        const { checkIn } = await sut.execute(checkInData)

        expect(checkIn).toHaveProperty("id")
    })

    it("Should not be able to create 2 check-in on same day", async () => {

        vi.setSystemTime(new Date(2023, 7, 28, 10, 0, 0))
        const checkInData = {
            gym_id: "gym_1",
            user_id: randomUUID(),
            validated_at: new Date(),
            userLatitude: 0,
            userLongitude: 0
        }

        await sut.execute(checkInData)
        //console.log(checkIn.created_at)
        await expect(()=>
            sut.execute(checkInData)
        ).rejects.toBeInstanceOf(Error)
    })

    it("Should be able to create 2 check-in on different days", async () => {
        vi.setSystemTime(new Date(2023, 7, 27, 10, 0, 0))

        const checkInData = {
            gym_id: "gym_1",
            user_id: randomUUID(),
            validated_at: new Date(),
            userLatitude: 0,
            userLongitude: 0
        }

        await sut.execute(checkInData)

        vi.setSystemTime(new Date(2023, 7, 28, 10, 0, 0))

        const {checkIn} = await sut.execute(checkInData)
        
        expect(checkIn).toHaveProperty("id")
    })

    it("Should not be able to check in on distant gym", async () => {
        inMemoryGym.items.push({
            id: "gym_02",
            title: "JS/TS GYM",
            description: "The best gym for JS/TS developers",
            phone: "123456789",
            latitude: new Decimal(-23.5156128),
            longitude: new Decimal(-46.6358589),
        })

        const checkInData = {
            gym_id: "gym_02",
            user_id: randomUUID(),
            validated_at: new Date(),
            userLatitude: -23.5491546,
            userLongitude: -46.6444317
        }

        await expect(()=>
            sut.execute(checkInData)
        ).rejects.toBeInstanceOf(Error)
        
    })
})