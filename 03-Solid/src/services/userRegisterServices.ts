import { UserRepository } from "@/repositories/usersRepository"
import { hash } from "bcryptjs"
import { userAlreadyExistsError } from "./errors/user-already-exists-error"

type UserRegisterServiceProps = {
    name: string;
    email: string;
    password: string;
}

export class UserRegisterService {
    constructor(private usersRepository: UserRepository){}

    async execute({name, email, password}: UserRegisterServiceProps){
        const password_hash = await hash(password, 6)

        //validate
        const userAlready = await this.usersRepository.findByEmail(email)
        if(userAlready){
            throw new userAlreadyExistsError()
        }
    
        //repository
        await this.usersRepository.create({name, email, password_hash})
    }

}