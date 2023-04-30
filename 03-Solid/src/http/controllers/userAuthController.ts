import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository"
import { InvalidCredentialsError } from "@/services/errors/user-not-exists-error"
import { UserAuthenticateService } from "@/services/userAuthenticateService"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function AuthUser(req: FastifyRequest, res: FastifyReply){
    const authUserSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const {email, password} = authUserSchema.parse(req.body)

    try {
        const userAuth = new UserAuthenticateService(new PrismaUserRepository)

        await userAuth.execute({email, password})
    } catch (error) {
        if(error instanceof InvalidCredentialsError){
            res.status(400).send({error: error.message})
        }
        throw error
    }

    res.status(200).send()
}