import { Answer } from "../entities/answer";

interface AnswerQuestionUseCaseInterface{
    instructorId: string;
    questionId: string;
    answerContent: string;
}

export class AnswerQuestionUseCase{
    execute({ questionId, answerContent}: AnswerQuestionUseCaseInterface){
        const anwser = new Answer(answerContent);

        return anwser
    }
}