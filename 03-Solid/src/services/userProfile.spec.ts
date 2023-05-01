import { beforeEach, describe, expect, it } from "vitest"
import { UserProfileService } from "./userProfileService"
import { InMemory } from "@/repositories/in-memory/in-memory-users-repository"
import { hash } from "bcryptjs"
import { ResourceNotFound } from "./errors/resource-not-found"

let inMemory: InMemory
let sut: UserProfileService

describe("Auth service", () => {

    beforeEach(()=> {
        inMemory = new InMemory()
        sut = new UserProfileService(inMemory)
    })

    it("Should be able to get the user profile by ID", async () => {
        const createdUser = await inMemory.create({
            name: "John Doe",
            email: "john@test.com",
            password_hash: await hash("123456", 6)
        })

        const { user } = await sut.execute({userId: createdUser.id})

        expect(user.email).toEqual("john@test.com")
    })

    it("Should not be able to get the user profile by ID if user does not exists", async () => {
        await expect(() =>

            sut.execute({userId: "123"})
            
        ).rejects.toBeInstanceOf(ResourceNotFound)
    })
})