import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository"
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error"
import { UserRegisterService } from "@/services/userRegisterServices"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function userRegister(req: FastifyRequest, res: FastifyReply) {
    const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
        password: z.string().min(6),
	})

    const {name, email, password} = registerBodySchema.parse(req.body)

    try {

        const userRegisterService = new UserRegisterService(new PrismaUserRepository)

        await userRegisterService.execute({name, email, password})

    } catch (error) {
        if(error instanceof UserAlreadyExistsError){
            return res.status(409).send({error: error.message})
        }
        throw error
    }

    return res.status(201).send()

}