import { FetchNearbyGyms } from "../fetchNearbyGymsService"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"

export function MakeFetchNearbyGymsService(){
    const prismaGymsRepository = new PrismaGymsRepository
    const service = new FetchNearbyGyms(prismaGymsRepository)

    return service
}