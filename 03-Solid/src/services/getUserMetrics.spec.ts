import { InMemoryCheckIn } from "@/repositories/in-memory/in-memory-check-in-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { GetUserMetricsService } from "./getUserMetricsService"

let inMemoryCheckIn: InMemoryCheckIn
let sut: GetUserMetricsService

describe("get User Metrics", () => {
    beforeEach(()=>{
        inMemoryCheckIn = new InMemoryCheckIn()
        sut = new GetUserMetricsService(inMemoryCheckIn)
    })

    it("Should be able to get check-ins counts from metrics", async () => {
        inMemoryCheckIn.create({
            id: "checkin_1",
            gym_id: "gym_1",
            user_id: "user_1",
            created_at: new Date(2023, 7, 28, 10, 0, 0),
            validated_at: null,
        })

        const count = await sut.execute({user_id: "user_1"})

        expect(count.totalCheckIns).toBe(1)
    })
})