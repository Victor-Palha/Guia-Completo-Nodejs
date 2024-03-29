import { UserRepository } from "@/repositories/usersRepository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { User } from "@prisma/client"

type UserRegisterServiceProps = {
    name: string;
    email: string;
    password: string;
}
type UserRegisterServiceResponse = {
    user: User
}

export class UserRegisterService {
    constructor(private userRepository: UserRepository){}

    async execute({name, email, password}: UserRegisterServiceProps): Promise<UserRegisterServiceResponse>{
        const password_hash = await hash(password, 6)

        //validate
        const userAlready = await this.userRepository.findByEmail(email)
        if(userAlready){
            throw new UserAlreadyExistsError
        }
    
        //repository
        const user = await this.userRepository.create({name, email, password_hash})

        return { user }
    }

}