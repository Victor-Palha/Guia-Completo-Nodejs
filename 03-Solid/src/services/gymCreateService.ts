import { GymsRepository } from "@/repositories/gymsRepository"
import { Gym } from "@prisma/client"

type gymCreateServiceRequest = {
    id?: string,
    title: string,
    description: string | null,
    phone: string | null,
    latitude: number,
    longitude: number,
}
type gymCreateServiceReponse = {
    gym: Gym
}

export class gymCreateService {
    constructor(private gymsRepository: GymsRepository){}
    async execute(data: gymCreateServiceRequest): Promise<gymCreateServiceReponse>{
        const gym = await this.gymsRepository.create(data)
        
        return { gym }
    }
}