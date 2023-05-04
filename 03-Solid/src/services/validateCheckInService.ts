import { CheckInsRepository } from "@/repositories/checkInRepository"
import { CheckIn } from "@prisma/client"
import { ResourceNotFound } from "./errors/resource-not-found"

interface ValidateRequest{
    checkIn_id: string
}

interface ValidateResponse{
    checkIn: CheckIn
}


export class ValidateCheckInService{
    constructor(private checkInsRepository: CheckInsRepository){}
    async execute({checkIn_id}: ValidateRequest): Promise<ValidateResponse>{
        const checkIn = await this.checkInsRepository.findById(checkIn_id)

        if(!checkIn){
            throw new ResourceNotFound
        }
        checkIn.validated_at = new Date()

        await this.checkInsRepository.save(checkIn)

        return {checkIn: checkIn}
    }
}