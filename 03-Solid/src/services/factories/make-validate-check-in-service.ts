import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { ValidateCheckInService } from "../validateCheckInService"

export function MakeValidateCheckInService(){
    const prismaCheckInsRepository = new PrismaCheckInsRepository
    const service = new ValidateCheckInService(prismaCheckInsRepository)

    return service
}