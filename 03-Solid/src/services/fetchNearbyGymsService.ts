import { GymsRepository } from "@/repositories/gymsRepository"
import { Gym } from "@prisma/client"

interface FetchNearbyGymsServiceRequest{
   userLatitude: number
    userLongitude: number
}

interface FetchNearbyGymsResponse{
    gyms: Gym[]
}

export class FetchNearbyGyms{
    constructor(private gymsRepository: GymsRepository){}
    async execute(data: FetchNearbyGymsServiceRequest): Promise<FetchNearbyGymsResponse>{
        const gyms = await this.gymsRepository.findManyNearby({latitude: data.userLatitude, longitude: data.userLongitude})
        
        return { gyms }
    }
}