import { CheckInsRepository } from "@/repositories/checkInRepository"
import { CheckIn } from "@prisma/client"
import { ResourceNotFound } from "./errors/resource-not-found"


interface FetchCheckinRequest{
    user_id: string,
    page: number
}

interface FetchCheckinResponse{
    checkIns: CheckIn[]
}

export class FetchCheckinService{
    constructor(private checkInsRepository: CheckInsRepository){}

    async execute(data: FetchCheckinRequest): Promise<FetchCheckinResponse>{
        const checkIns = await this.checkInsRepository.findManyByUserId(data.user_id, data.page)

        if(checkIns.length === 0){
            throw new ResourceNotFound()
        }

        return {
            checkIns
        }
    }

}