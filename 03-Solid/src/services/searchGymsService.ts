import { GymsRepository } from "@/repositories/gymsRepository"
import { Gym } from "@prisma/client"

interface SearchGymsServiceRequest{
    query: string,
    page: number,
}

interface SearchGymsServiceResponse{
    gyms: Gym[]
}

export class SearchGymsService{
    constructor(private gymsRepository: GymsRepository){}
    async execute(data: SearchGymsServiceRequest): Promise<SearchGymsServiceResponse>{
        const gyms = await this.gymsRepository.searchMany(data.query, data.page)
        
        return { gyms }
    }
}