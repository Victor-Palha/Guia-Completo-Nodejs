import { AnswerRepository } from "../../src/domain/forum/application/repositories/answers-repository";
import { Answer } from "../../src/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswerRepository{
    public items: Answer[] = [];

    async create(answer: Answer){
        this.items.push(answer);
    }
    async findById(id: string): Promise<Answer | null> {
        const answer = this.items.find(answer => answer.id.toString() === id);

        if(!answer){
            return null
        }

        return answer;
    }

    async deleteById(answer: Answer){
        const answerIndex = this.items.findIndex(item => item.id === answer.id);

        if(answerIndex === -1){
            return;
        }

        this.items.splice(answerIndex, 1);
    }
}