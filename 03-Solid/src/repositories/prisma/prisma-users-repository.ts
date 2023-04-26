import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { UserRepository } from "../usersRepository"

export class PrismaUserRepository implements UserRepository{

    async create(data: Prisma.UserCreateInput){
        const user = await prisma.user.create({
            data
        })
        return user
        
    }
    async findByEmail(email: string){
        const userAlready = await prisma.user.findUnique({
            where:{
                email
            }
        })
        return userAlready
    }
}