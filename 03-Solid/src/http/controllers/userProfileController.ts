import { MakeGetUserProfileService } from "@/services/factories/make-get-user-profile-service"
import { FastifyReply, FastifyRequest } from "fastify"

export async function UserProfile(req:FastifyRequest, res:FastifyReply){
    
    const getUserProfile = MakeGetUserProfileService()

    const {user} = await getUserProfile.execute({
        userId: req.user.sub
    })


    return res.status(200).send({user:{...user, password_hash: undefined}})
}