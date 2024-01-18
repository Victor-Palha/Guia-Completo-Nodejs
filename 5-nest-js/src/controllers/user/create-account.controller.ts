import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { User } from "@prisma/client";
import { ConflictException } from "@nestjs/common";
import { z } from "zod";
import {hash} from "bcryptjs"
import { ZodValidationPipe } from "@/pipes/zod-validation.pipes";


const createAccountSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(3)
})

type CreateAccountRequest = z.infer<typeof createAccountSchema>;

type CreateAccountResponse = {
    user: Partial<User>;
}

@Controller("/accounts")
export class CreateAccountController{
    constructor(private readonly prisma: PrismaService){}

    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createAccountSchema))
    async execute(@Body() body: CreateAccountRequest): Promise<CreateAccountResponse>{

        const { name, email, password } = body;


        const userExists = await this.prisma.user.findUnique({
            where: {
                email
            }
        })

        if(userExists){
            throw new ConflictException("User with this email already exists.")
        }

        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                password: await hash(password, 6)
            }
        });

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
    }
}