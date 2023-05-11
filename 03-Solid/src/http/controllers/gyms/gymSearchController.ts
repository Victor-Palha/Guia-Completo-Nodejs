import { MakeSearchGymsService } from "@/services/factories/make-search-gyms-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function gymSearch(req:FastifyRequest, res: FastifyReply){
    const searchGymQuerySchema = z.object({
        query: z.string(),
        page: z.coerce.number().min(1).default(1),
    })

    const { query, page } = searchGymQuerySchema.parse(req.query)

    const searchGymsService = MakeSearchGymsService()

    const {gyms} = await searchGymsService.execute({
        query,
        page
    })

    return res.status(200).send(gyms)
}