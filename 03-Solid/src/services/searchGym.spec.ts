import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryGyms } from "@/repositories/in-memory/in-memory-gyms-repository"
import { SearchGymsService } from "./searchGymsService"


let inMemoryGyms: InMemoryGyms
let sut: SearchGymsService
describe("Search Gyms", () => {

    beforeEach(async ()=>{
        inMemoryGyms = new InMemoryGyms()
        sut = new SearchGymsService(inMemoryGyms)
    })

    it("Should be able to search gyms", async ()=>{
        await inMemoryGyms.create({
            title: "Academia 01",
            description: "Academia 01",
            phone: "123456789",
            latitude: 0,
            longitude: 0,
        })

        await inMemoryGyms.create({
            title: "Academia 02",
            description: "Academia 02",
            phone: "123456789",
            latitude: 0,
            longitude: 0,
        })

        const {gyms} = await sut.execute({query: "Academia 01", page: 1})

        expect(gyms.length).toBe(1)
        expect(gyms).toEqual([
            expect.objectContaining({title: "Academia 01"})
        ])
    })

    it("Should be able to fetch paginated gyms search", async ()=>{
        for (let index = 1; index <= 22; index++) {
            await inMemoryGyms.create({
                title: `Academia ${index}`,
                description: "Academia 01",
                phone: "123456789",
                latitude: 0,
                longitude: 0,
            })
        }

        const {gyms} = await sut.execute({query: "Academia", page: 2})
        expect(gyms.length).toBe(2)
        expect(gyms).toEqual([
            expect.objectContaining({title: "Academia 21"}),
            expect.objectContaining({title: "Academia 22"})
        ])
    })

})