import { Prisma, CheckIn } from "@prisma/client"
import { CheckInsRepository } from "../checkInRepository"
import { randomUUID } from "node:crypto"

export class InMemoryCheckIn implements CheckInsRepository {

    public items: CheckIn[] = []

    async findByUserIdOnDate(user_id: string, date: Date){
        const sameDate = this.items.find((item) => {
            return item.user_id === user_id
        })
        
        return sameDate ? sameDate : null
    }


    async create(data: Prisma.CheckInUncheckedCreateInput){
        
        const checkIn = {
            id: randomUUID(),
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            user_id: data.user_id,
            gym_id: data.gym_id,
            created_at: new Date()
        }

        this.items.push(checkIn)
        

        return checkIn
    }

}