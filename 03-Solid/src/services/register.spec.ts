import { it, expect, describe, beforeEach } from "vitest"
import { compare } from "bcryptjs"
import { UserRegisterService } from "./userRegisterServices"
import { InMemory } from "@/repositories/in-memory/in-memory-users-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"


let RegisterService: UserRegisterService

describe("Register Service", () => {
    
    beforeEach(()=>{
        RegisterService = new UserRegisterService(new InMemory)
    })

    it("Should hash user password before saving to database", async () => {

        const {user} = await RegisterService.execute({
            name: "John Doe",
            email: "john@test.com",
            password: "123456"
        })

        const passwordMatch = await compare("123456", user.password_hash)
        expect(passwordMatch).toBe(true)
    })
    it("Should be able to register", async () => {

        const {user} = await RegisterService.execute({
            name: "John Doe",
            email: "john@test.com",
            password: "123456"
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it("Should not be able to register a new user with an email already exists", async () => {

        await RegisterService.execute({
            name: "John Doe",
            email: "john@test.com",
            password: "123456"
        })

        await expect(()=>
            RegisterService.execute({
                name: "John Doe",
                email: "john@test.com",
                password: "123456"
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})