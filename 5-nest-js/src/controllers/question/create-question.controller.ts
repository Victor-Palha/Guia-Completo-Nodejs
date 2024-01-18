import { Body, ConflictException, Controller, HttpCode, Post, UseGuards, UsePipes } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "@/auth/current-user-decorator";
import { TokenPayload } from "@/auth/jwt-strategy";
import { ZodValidationPipe } from "@/pipes/zod-validation.pipes";
import { PrismaService } from "@/prisma/prisma.service";
import { z } from "zod";

const QuestionSchema = z.object({
    title: z.string().min(5),
    content: z.string()
})

type QuestionRequest = z.infer<typeof QuestionSchema>;

@Controller("/questions")
@UseGuards(AuthGuard("jwt"))
export class CreateQuestionController{
    constructor(private prisma: PrismaService){}
    
    @Post("/create")
    @HttpCode(201)
    async execute(@Body(new ZodValidationPipe(QuestionSchema)) body: QuestionRequest, @CurrentUser() user: TokenPayload){
        const {title, content} = body;
        const slug = this.createSlug(title);
        const questionExists = await this.prisma.question.findUnique({
            where: {
                slug
            }
        })
        if(questionExists){
            throw new ConflictException("Question already exists.")
        }

        const question = await this.prisma.question.create({
            data: {
                title,
                content,
                slug,
                authorId: user.sub
            }
        })

        return {question}
    }

    private createSlug(title: string){
        return title.toLowerCase().split(" ").join("-").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    }
}