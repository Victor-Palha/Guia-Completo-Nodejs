import { Question } from "../../enterprise/entities/question";
import { QuestionRepository } from "../repositories/question-repository";


interface GetQuestionBySlugDTO{
    slug: string
}

interface GetQuestionBySlugResponse{
    question: Question
}

export class GetQuestionBySlugUseCase {
    constructor(private questionRepository: QuestionRepository){}

    async execute({slug}: GetQuestionBySlugDTO): Promise<GetQuestionBySlugResponse>{
        const question = await this.questionRepository.findBySlug(slug);

        if(!question) throw new Error("Question not found");

        return {question}
    }
}