import { prisma } from "@/lib/prisma"
import { PrismaUserRepository } from "@/repositories/prisma-users-repository"
import { hash } from "bcryptjs"

type UserRegisterService = {
    name: string;
    email: string;
    password: string;
}
export async function userRegisterService({name, email, password}: UserRegisterService){
    const password_hash = await hash(password, 6)

    //validate
    const userAlready = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(userAlready){
        throw new Error("User already exists")
    }

    //repository
    const prismaUserRepository = new PrismaUserRepository()

    await prismaUserRepository.create({name, email, password_hash})
}