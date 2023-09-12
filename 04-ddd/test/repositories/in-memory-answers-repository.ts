import { AnswerRepository } from "../../src/domain/forum/application/repositories/answers-repository";
import { Answer } from "../../src/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswerRepository{
    private items: Answer[] = [];

    async create(answer: Answer){
        this.items.push(answer);
    }
}