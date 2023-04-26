import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { userRegisterService } from "../../services/userRegisterServices"

export async function userRegister(req: FastifyRequest, res: FastifyReply) {
    const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
        password: z.string().min(6),
	})

    const {name, email, password} = registerBodySchema.parse(req.body)

    try {
        await userRegisterService({name, email, password})
        
    } catch (error) {
        res.status(409).send()
    }

    return res.status(201).send()

}