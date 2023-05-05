import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository"
import { UserProfileService } from "../userProfileService"

export function MakeGetUserProfileService(){
    const prismaUserRepository = new PrismaUserRepository
    const service = new UserProfileService(prismaUserRepository)

    return service
}