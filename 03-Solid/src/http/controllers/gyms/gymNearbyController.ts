import { MakeFetchNearbyGymsService } from "@/services/factories/make-fetch-nearby-gyms-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function gymNearby(req:FastifyRequest, res: FastifyReply){
    const nearbyGymQuerySchema = z.object({
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        })
    })

    const { latitude, longitude } = nearbyGymQuerySchema.parse(req.query)

    const fetchNearbyGymsService = MakeFetchNearbyGymsService()

    const {gyms} = await fetchNearbyGymsService.execute({
        userLatitude: latitude,
        userLongitude: longitude
    })

    return res.status(200).send(gyms)
}