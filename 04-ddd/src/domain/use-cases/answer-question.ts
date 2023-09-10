import { UniqueEntityId } from "../core/entities/unique-entity-id";
import { Answer } from "../entities/answer";
import { AnswerRepository } from "../repositories/answers-repository";

interface AnswerQuestionDTO{
    authorID: string;
    questionID: string;
    content: string;
}
export class AnswerQuestionUseCase{
    constructor(private answerRepository: AnswerRepository){}
    async execute({authorID, questionID, content}: AnswerQuestionDTO){
        const answer = Answer.create({
            authorID: new UniqueEntityId(authorID),
            questionID: new UniqueEntityId(questionID),
            content
        });

        await this.answerRepository.create(answer);
        return answer
    }
}