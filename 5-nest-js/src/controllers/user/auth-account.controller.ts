import { Body, Controller, NotFoundException, Post } from "@nestjs/common";
import { compare, hash } from "bcryptjs";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";
// Validation
const authAccountSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3)
})
// Type Validation
type AuthAccountRequest = z.infer<typeof authAccountSchema>;

@Controller("/accounts")
export class AuthAccountController{
    constructor(private readonly prisma: PrismaService){}

    @Post("/auth")
    async execute(@Body() body: AuthAccountRequest){
        const {email, password} = body;
        //find User
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!user){
            throw new NotFoundException("Email or password incorrect.")
        }

        const verifyPass = await compare(password, user.password);
        if(!verifyPass){
            throw new NotFoundException("Email or password incorrect.")
        }

        return {
            message: "User authenticated successfully."
        }
    }
}