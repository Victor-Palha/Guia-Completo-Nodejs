import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CheckInService } from "../checkInService"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"

export function MakeCheckInService(){
    const prismaCheckInsRepository = new PrismaCheckInsRepository
    const gymsRepository = new PrismaGymsRepository
    const service = new CheckInService(prismaCheckInsRepository, gymsRepository)

    return service
}