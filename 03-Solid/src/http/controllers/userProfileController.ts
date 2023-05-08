import { FastifyReply, FastifyRequest } from "fastify"

export async function UserProfile(req:FastifyRequest, res:FastifyReply){
    
    await req.jwtVerify()

    return res.status(200).send({user: req.user.sub})
}