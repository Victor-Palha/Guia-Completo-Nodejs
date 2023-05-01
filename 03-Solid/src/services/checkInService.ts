import { CheckInsRepository } from "@/repositories/checkInRepository"
import { CheckIn } from "@prisma/client"

interface CheckInRequest {
    user_id: string,
    gym_id: string
}

interface CheckInResponse {
    checkIn: CheckIn
}

export class CheckInService{
    constructor(private checkInRepository: CheckInsRepository){}

    async execute({user_id, gym_id}: CheckInRequest): Promise<CheckInResponse>{
        const checkInSameDay = await this.checkInRepository.findByUserIdOnDate(user_id, new Date())

        if(checkInSameDay){
            throw new Error("You already checked in today")
        }

        const checkIn = await this.checkInRepository.create({
            user_id,
            gym_id,

        })

        return {checkIn}
    }
}