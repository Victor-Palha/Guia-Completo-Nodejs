import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository"
import { UserRegisterService } from "../userRegisterServices"

export function MakeUserRegisterService(){
    const prismaUserRepository = new PrismaUserRepository
    const userRegisterService = new UserRegisterService(prismaUserRepository)

    return userRegisterService
}