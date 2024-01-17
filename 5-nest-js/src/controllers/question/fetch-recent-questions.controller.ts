import { Controller, Get, Query } from "@nestjs/common";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipes";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const QuerySchema = z.coerce.number().optional().default(1)


const validationSchema = new ZodValidationPipe(QuerySchema)
type QuestionResponseSchema = z.infer<typeof QuerySchema>

@Controller("/questions")
export class FetchRecentQuestionsController{
    constructor(
        private prisma: PrismaService
    ){}

    @Get()
    async execute(@Query("page", validationSchema) page: QuestionResponseSchema){
        const DEFAULT = 10
        if(typeof page !== "number" || page < 1) page = 1
        const questions = await this.prisma.question.findMany({
            orderBy: {
                createdAt: "desc"
            },
            take: DEFAULT,
            skip: (page - 1) * DEFAULT,
        })

        return {questions}
    }
}