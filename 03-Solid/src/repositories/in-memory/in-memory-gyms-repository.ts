import { Gym } from "@prisma/client"
import { GymsRepository } from "../gymsRepository"

export class InMemoryGyms implements GymsRepository {
    public items: Gym[] = []

    async findById(id: string) {
        const gyms = this.items.filter((item) => item.id === id)
        if(gyms.length === 0){
            return null
        }
        return gyms[0]
    }

}