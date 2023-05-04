import { beforeEach, describe, expect, it } from "vitest"
import { FetchNearbyGyms } from "./fetchNearbyGymsService"
import { InMemoryGyms } from "@/repositories/in-memory/in-memory-gyms-repository"

let sut: FetchNearbyGyms
let inMemoryGyms: InMemoryGyms

describe("Fetch nearby gyms", async ()=>{
    beforeEach(async ()=>{
        inMemoryGyms = new InMemoryGyms()
        sut = new FetchNearbyGyms(inMemoryGyms)
    })

    it("Should be able to fetch nearby gyms", async ()=>{
        await inMemoryGyms.create({
            title: "Gym 1",
            latitude: -1.431854,
            longitude: -48.413569,
        })

        await inMemoryGyms.create({
            title: "Gym 2",
            latitude: -1.4336011,
            longitude: -48.4109372,
        })
        await inMemoryGyms.create({
            title: "Gym 3",
            latitude: 52.5192443,
            longitude: 13.4146359,
        })
        //52.5192443
        //13.4146359

        const {gyms} = await sut.execute({userLatitude: -1.4318539, userLongitude: -48.4124271})
        //console.log(gyms)
        expect(gyms.length).toBe(2)
        expect(gyms).toEqual([
            expect.objectContaining({title: "Gym 1"}),
            expect.objectContaining({title: "Gym 2"}),
        ])
    })
})