import { describe, expect, it } from "vitest"
import { UserAuthenticateService } from "./userAuthenticateService"
import { InMemory } from "@/repositories/in-memory/in-memory-users-repository"
import { hash } from "bcryptjs"
import { InvalidCredentialsError } from "./errors/user-not-exists-error"


describe("Auth service", () => {
    it("Should be able to authenticate", async () => {
        const inMemory = new InMemory()
        const sut = new UserAuthenticateService(inMemory)

        await inMemory.create({
            name: "John Doe",
            email: "john@test.com",
            password_hash: await hash("123456", 6)
        })

        const {user} = await sut.execute({email: "john@test.com", password: "123456"})

        expect(user).toHaveProperty("id")
    })

    it("Should not be able to authenticate with wrong email", async () => {
        const inMemory = new InMemory()
        const sut = new UserAuthenticateService(inMemory)

        expect(async ()=> await sut.execute({email: "john@teste.com", password: "123456"})).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it("Should not be able to authenticate with wrong password", async () => {
        const inMemory = new InMemory()
        const sut = new UserAuthenticateService(inMemory)

        await inMemory.create({
            name: "John Doe",
            email: "john@test.com",
            password_hash: await hash("123456", 6)
        })

        expect(async ()=> await sut.execute({email: "john@teste.com", password: "1234567"})).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})