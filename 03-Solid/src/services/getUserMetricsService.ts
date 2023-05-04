import { CheckInsRepository } from "@/repositories/checkInRepository"

interface GetUserMetricsRequest{
    user_id: string
}

interface GetUserMetricsResponse{
    totalCheckIns: number,
}

export class GetUserMetricsService{
    constructor(private checkInsRepository: CheckInsRepository){}
    async execute({user_id}: GetUserMetricsRequest): Promise<GetUserMetricsResponse>{
        const totalCheckIns = await this.checkInsRepository.countByUserId(user_id)
        
        return {totalCheckIns}
    }
}