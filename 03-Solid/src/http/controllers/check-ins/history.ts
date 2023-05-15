import { MakeFetchUserCheckInsHistoryService } from "@/services/factories/make-fetch-user-check-in-history-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function historyCheckIn(req:FastifyRequest, res: FastifyReply){
    const checkInHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    })

    const { page } = checkInHistoryQuerySchema.parse(req.query)

    const fetchCheckInHistory = MakeFetchUserCheckInsHistoryService()

    const {checkIns} = await fetchCheckInHistory.execute({
        page,
        user_id: req.user.sub
    })

    return res.status(200).send(checkIns)
}