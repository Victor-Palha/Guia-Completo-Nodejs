import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { gymCreateService } from "../gymCreateService"

export function MakeCreateGymsService(){
    const prismaGymsRepository = new PrismaGymsRepository
    const service = new gymCreateService(prismaGymsRepository)

    return service
}