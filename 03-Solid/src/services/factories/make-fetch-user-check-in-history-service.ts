import { FetchCheckinService } from "../fetchCheckinService"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"

export function MakeFetchUserCheckInsHistoryService(){
    const prismaCheckInsRepository = new PrismaCheckInsRepository
    const service = new FetchCheckinService(prismaCheckInsRepository)

    return service
}