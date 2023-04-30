import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository"
import { UserAuthenticateService } from "../userAuthenticateService"

export function MakeUserAuthService(){
    const prismaUserRepository = new PrismaUserRepository()
    const userAuthenticateService = new UserAuthenticateService(prismaUserRepository)

    return userAuthenticateService
}