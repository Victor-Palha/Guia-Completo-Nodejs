import { UserRepository } from "@/repositories/usersRepository"
import { User } from "@prisma/client"
import { ResourceNotFound } from "./errors/resource-not-found"

interface UserProfileRequest {
    userId: string
}
interface UserProfileResponse {
    user: User
}

export class UserProfileService{
    constructor(private userRepository: UserRepository){}

    async execute({userId}: UserProfileRequest): Promise<UserProfileResponse>{
        const user = await this.userRepository.findById(userId)
        if(!user){
            throw new ResourceNotFound()
        }
        return {user}
    }
}