import { Prisma, CheckIn } from "@prisma/client"
import { CheckInsRepository } from "../checkInRepository"
import { randomUUID } from "node:crypto"
import dayjs from "dayjs"

export class InMemoryCheckIn implements CheckInsRepository {
    
    public items: CheckIn[] = []
    
    async findByUserIdOnDate(user_id: string, date: Date){
        const startOfTheDay = dayjs(date).startOf("date")
        const endOfTheDay = dayjs(date).endOf("date")

        const sameDate = this.items.find((item) => {
            
            const checkInDate = dayjs(item.created_at)
            
            const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)
            //console.log(checkInDate, startOfTheDay, endOfTheDay)
            
            return item.user_id === user_id && isOnSameDate
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
    
    async findManyByUserId(user_id: string, page: number) {
        
        const checkIns = this.items.filter((item) => item.user_id === user_id).slice((page - 1)*20, page*20)
        
        return checkIns
    }
}