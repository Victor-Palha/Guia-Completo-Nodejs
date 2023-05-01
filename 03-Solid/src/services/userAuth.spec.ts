import { beforeEach, describe, expect, it } from "vitest"
import { UserAuthenticateService } from "./userAuthenticateService"
import { InMemory } from "@/repositories/in-memory/in-memory-users-repository"
import { hash } from "bcryptjs"
import { InvalidCredentialsError } from "./errors/user-not-exists-error"

let inMemory: InMemory
let sut: UserAuthenticateService

describe("Auth service", () => {

    beforeEach(()=> {
        inMemory = new InMemory()
        sut = new UserAuthenticateService(inMemory)
    })
    
    it("Should be able to authenticate", async () => {

        await inMemory.create({
            name: "John Doe",
            email: "john@test.com",
            password_hash: await hash("123456", 6)
        })

        const {user} = await sut.execute({email: "john@test.com", password: "123456"})

        expect(user).toHaveProperty("id")
    })

    it("Should not be able to authenticate with wrong email", async () => {
        expect(async ()=> await sut.execute({email: "john@teste.com", password: "123456"})).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it("Should not be able to authenticate with wrong password", async () => {
        await inMemory.create({
            name: "John Doe",
            email: "john@test.com",
            password_hash: await hash("123456", 6)
        })

        await expect(()=> sut.execute({email: "john@teste.com", password: "1234567"})).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})