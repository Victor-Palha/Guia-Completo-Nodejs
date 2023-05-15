import { MakeValidateCheckInService } from "@/services/factories/make-validate-check-in-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function validateCheckIn(req: FastifyRequest, res: FastifyReply){
    const validateCheckInParamsSchema = z.object({
        checkInId: z.string().uuid()
    })

    const {checkInId} = validateCheckInParamsSchema.parse(req.params)

    const validateCheckInService = MakeValidateCheckInService()

    validateCheckInService.execute({
        checkIn_id: checkInId
    })

    return res.status(204).send()
}