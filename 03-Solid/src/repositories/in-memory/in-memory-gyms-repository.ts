import { Gym, Prisma } from "@prisma/client"
import { GymsRepository } from "../gymsRepository"
import { randomUUID } from "node:crypto"


export class InMemoryGyms implements GymsRepository {
    public items: Gym[] = []

    async findById(id: string) {
        const gyms = this.items.filter((item) => item.id === id)
        if(gyms.length === 0){
            return null
        }
        return gyms[0]
    }

    async create(data: Prisma.GymCreateInput){
        
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
        }

        this.items.push(gym)
        return gym
    }

}