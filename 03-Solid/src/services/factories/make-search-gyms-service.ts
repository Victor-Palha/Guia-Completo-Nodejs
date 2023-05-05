import { SearchGymsService } from "../searchGymsService"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"

export function MakeSearchGymsService(){
    const prismaGymsRepository = new PrismaGymsRepository
    const service = new SearchGymsService(prismaGymsRepository)

    return service
}