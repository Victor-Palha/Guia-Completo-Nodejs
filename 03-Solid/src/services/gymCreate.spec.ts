import { beforeEach, describe, expect, it } from "vitest"

import { InMemoryGyms } from "@/repositories/in-memory/in-memory-gyms-repository"
import { gymCreateService } from "./gymCreateService"



let sut: gymCreateService
let inMemoryGym: InMemoryGyms

describe("Gym service", () => {

    beforeEach(()=> {

        inMemoryGym = new InMemoryGyms()
        sut = new gymCreateService(inMemoryGym)

    })

    it("Should be able to create a new gym", async () => {
            
            const gymData = {
                title: "JS/TS GYM",
                description: "The best gym for JS/TS developers",
                phone: "123456789",
                latitude: 0,
                longitude: 0,
            }
    
            const { gym } = await sut.execute(gymData)
    
            expect(gym).toHaveProperty("id")
    })
    

})