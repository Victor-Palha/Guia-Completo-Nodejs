import { QuestionRepository } from "../../src/domain/forum/application/repositories/question-repository";
import { Question } from "../../src/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionRepository{
    public items: Question[] = [];

    async create(question: Question){
        this.items.push(question);
    }

    async findBySlug(slug: string): Promise<Question | null>{
        const question = this.items.find(question => question.slug.slug === slug);

        if(!question){
            return null
        }

        return question;
    }

    async findById(id: string): Promise<Question | null> {
        const question = this.items.find(question => question.id.toString() === id);

        if(!question){
            return null
        }

        return question;
    }

    async deleteById(question: Question){
        const questionIndex = this.items.findIndex(item => item.id === question.id);

        if(questionIndex === -1){
            return;
        }

        this.items.splice(questionIndex, 1);
    }
}