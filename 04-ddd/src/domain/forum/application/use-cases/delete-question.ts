import { QuestionRepository } from "../repositories/question-repository";

interface DeleteQuestionUseCaseDTO{
    authorId: string,
    questionId: string
}

interface DeleteQuestionUseCaseResponse{
    //void
}

export class DeleteQuestionUseCase{
    constructor(
        private questionRepository: QuestionRepository
    ){}

    async execute({questionId, authorId}: DeleteQuestionUseCaseDTO): Promise<DeleteQuestionUseCaseResponse>{
        const question = await this.questionRepository.findById(questionId);

        if(!question){
            throw new Error("Question not found");
        }
        if(authorId !== question.authorID.toString()){
            throw new Error("You can't delete this question");
        }

        await this.questionRepository.deleteById(question);

        return {};
    }
}