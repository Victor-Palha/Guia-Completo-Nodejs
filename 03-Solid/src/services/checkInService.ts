import { CheckInsRepository } from "@/repositories/checkInRepository"
import { GymsRepository } from "@/repositories/gymsRepository"
import { CheckIn } from "@prisma/client"
import { ResourceNotFound } from "./errors/resource-not-found"
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates"

interface CheckInRequest {
    user_id: string,
    gym_id: string,
    userLatitude: number,
    userLongitude: number,
}

interface CheckInResponse {
    checkIn: CheckIn
}

export class CheckInService{
    constructor(private checkInsRepository: CheckInsRepository, private gymsRepository: GymsRepository){}

    async execute({user_id, gym_id, userLatitude, userLongitude}: CheckInRequest): Promise<CheckInResponse>{

        const gym = await this.gymsRepository.findById(gym_id)

        if(!gym){
            throw new ResourceNotFound()
        }

        const distance = getDistanceBetweenCoordinates({latitude: userLatitude, longitude: userLongitude}, {latitude: Number(gym.latitude), longitude: Number(gym.longitude)})

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if(distance > MAX_DISTANCE_IN_KILOMETERS){
            throw new Error("You are not in the gym")
        }


        const checkInSameDay = await this.checkInsRepository.findByUserIdOnDate(user_id, new Date())

        if(checkInSameDay){
            throw new Error("You already checked in today")
        }

        const checkIn = await this.checkInsRepository.create({
            user_id,
            gym_id,

        })

        return {checkIn}
    }
}