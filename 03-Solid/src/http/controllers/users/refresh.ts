import { FastifyReply, FastifyRequest } from "fastify"

export async function refreshUser(req: FastifyRequest, res: FastifyReply){

    await req.jwtVerify({onlyCookie: true})

    const {role} = req.user

        const token = await res.jwtSign({
            role
        }, {
            sign:{
                sub: req.user.sub,
            }
        })

        const refreshToken = await res.jwtSign({
            role
        },{
            sign: {
                sub: req.user.sub,
                expiresIn: "7d"
            }
        })
        
        res.status(200).setCookie("refreshToken", refreshToken, {path: "/", secure: true, sameSite: true, httpOnly: true}).send({token: token})


}