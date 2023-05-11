import { MakeCreateGymsService } from "@/services/factories/make-create-gym-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function gymCreate(req: FastifyRequest, res: FastifyReply){
    const createGymBodySchema = z.object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        })
    })

    const {title, description, phone, latitude, longitude} = createGymBodySchema.parse(req.body)

    const createGymService = MakeCreateGymsService()

    await createGymService.execute({
        title,
        description,
        phone,
        latitude,
        longitude,
    })


    return res.status(201).send()
}