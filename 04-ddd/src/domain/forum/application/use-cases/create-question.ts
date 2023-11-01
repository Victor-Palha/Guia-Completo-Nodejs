import { UniqueEntityId } from "../../../core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionRepository } from "../repositories/question-repository";

interface CreateQuestionDTO{
    authorID: string, 
    title: string, 
    content: string, 
}

interface CreateQuestionResponse{
    question: Question
}
export class CreateQuestionUseCase{
    constructor(
        private QuestionRepository: QuestionRepository
    ){}
    
    async execute({authorID, content, title}: CreateQuestionDTO): Promise<CreateQuestionResponse>{
        const question = Question.create({
            authorID: new UniqueEntityId(authorID),
            content,
            title,    
        });

        await this.QuestionRepository.create(question);
        return {question}
    }

    
}