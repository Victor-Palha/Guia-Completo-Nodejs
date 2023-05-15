import { MakeGetUserMetricsService } from "@/services/factories/make-get-user-metrics-service"
import { FastifyReply, FastifyRequest } from "fastify"

export async function userCheckInMetrics(req:FastifyRequest, res: FastifyReply){

    const userMetrics = MakeGetUserMetricsService()

    const {totalCheckIns} = await userMetrics.execute({
        user_id: req.user.sub
    })

    return res.status(200).send(totalCheckIns)
}