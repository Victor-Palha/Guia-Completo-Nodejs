import { InvalidCredentialsError } from "@/services/errors/user-not-exists-error"
import { MakeUserAuthService } from "@/services/factories/make-UserAuth-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function AuthUser(req: FastifyRequest, res: FastifyReply){
    const authUserSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const {email, password} = authUserSchema.parse(req.body)

    try {
        const userAuth = MakeUserAuthService()

        const {user} = await userAuth.execute({email, password})

        const token = await res.jwtSign({
            role: user.role
        },{
            sign:{
                sub: user.id,
            }
        })

        const refreshToken = await res.jwtSign({
            role: user.role
        },{
            sign: {
                sub: user.id,
                expiresIn: "7d"
            }
        })
        
        res.status(200).setCookie("refreshToken", refreshToken, {path: "/", secure: true, sameSite: true, httpOnly: true}).send({token: token})

    } catch (error) {
        if(error instanceof InvalidCredentialsError){
            res.status(400).send({error: error.message})
        }
        throw error
    }

}