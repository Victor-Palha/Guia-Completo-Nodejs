import { UserRepository } from "../usersRepository"
import { Prisma, User } from "@prisma/client"

export class InMemory implements UserRepository{

    public items: User[] = []

    async create(data: Prisma.UserCreateInput){
        
        const user = {
            id: "user_1",
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
        return user[0]
    }
}