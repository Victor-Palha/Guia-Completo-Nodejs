import { UserRepository } from "@/repositories/usersRepository"
import { InvalidCredentialsError } from "./errors/user-not-exists-error"
import { compare } from "bcryptjs"
import { User } from "@prisma/client"

interface AuthUserRequest {
    email: string
    password: string
}

interface AuthUserResponse {
    user: User
}

export class UserAuthenticateService {
    constructor(private userRepository: UserRepository) {}

    async execute(data: AuthUserRequest): Promise<AuthUserResponse>{
        // auth
        const user = await this.userRepository.findByEmail(data.email)
        if(!user){
            throw new InvalidCredentialsError()
        }

        const passwordMatch = await compare(data.password, user.password_hash)
        if(!passwordMatch){
            throw new InvalidCredentialsError()
        }

        return {user}
    }
}