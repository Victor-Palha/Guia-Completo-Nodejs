import { Body, Controller, NotFoundException, Post, UsePipes } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcryptjs";
import { ZodValidationPipe } from "@/pipes/zod-validation.pipes";
import { PrismaService } from "@/prisma/prisma.service";
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
    constructor(
        private jwt: JwtService,
        private readonly prisma: PrismaService
    ){}

    @Post("/auth")
    @UsePipes(new ZodValidationPipe(authAccountSchema))
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
        const token = await this.jwt.signAsync({sub: user.id})

        return {
            token
        }
    }
}