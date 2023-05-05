import { GetUserMetricsService } from "../getUserMetricsService"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"

export function MakeGetUserMetricsService(){
    const prismaCheckInsRepository = new PrismaCheckInsRepository
    const service = new GetUserMetricsService(prismaCheckInsRepository)

    return service
}