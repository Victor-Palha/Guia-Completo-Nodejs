import { Gym, Prisma } from "@prisma/client"
import { FindManyNearbyParams, GymsRepository } from "../gymsRepository"
import { randomUUID } from "node:crypto"
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates"


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

    async searchMany(query: string, page: number) {
        return this.items.filter((item) => item.title.includes(query)).slice((page - 1) * 20, page * 20)
    }

    async findManyNearby(data: FindManyNearbyParams) {
        return this.items.filter((item)=>{
            const distance = getDistanceBetweenCoordinates({
                latitude: data.latitude,
                longitude: data.longitude,
            },{
                latitude: Number(item.latitude),
                longitude: Number(item.longitude),
            })

            return distance <= 10
        })
    }

}