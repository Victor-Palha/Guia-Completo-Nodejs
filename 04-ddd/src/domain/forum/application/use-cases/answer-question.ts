import { UniqueEntityId } from "../../../core/entities/unique-entity-id";
import { AnswerRepository } from "../repositories/answers-repository";
import { Answer } from "../../enterprise/entities/answer";

interface AnswerQuestionDTO{
    authorID: string;
    questionID: string;
    content: string;
}

interface AnswerQuestionResponse{
    answer: Answer
}
export class AnswerQuestionUseCase{
    constructor(private answerRepository: AnswerRepository){}
    async execute({authorID, questionID, content}: AnswerQuestionDTO): Promise<AnswerQuestionResponse>{
        const answer = Answer.create({
            authorID: new UniqueEntityId(authorID),
            questionID: new UniqueEntityId(questionID),
            content
        });

        await this.answerRepository.create(answer);
        return {answer}
    }
}