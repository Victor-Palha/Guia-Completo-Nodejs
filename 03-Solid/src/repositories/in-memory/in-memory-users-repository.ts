import { randomUUID } from "node:crypto"
import { UserRepository } from "../usersRepository"
import { Prisma, User } from "@prisma/client"

export class InMemory implements UserRepository{

    public items: User[] = []

    async create(data: Prisma.UserCreateInput){
        
        const user = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date()
        }
        

        this.items.push(user)
        return user
    }

    async findByEmail(email: string){
        const user = this.items.filter((item) => item.email === email)

        if(user.length === 0){
            return null
        }

        return user[0]
    }

    async findById(id: string){
        const user = this.items.filter((item) => item.id === id)
        
        if(user.length === 0){
            return null
        }
        return user[0]
    }
}