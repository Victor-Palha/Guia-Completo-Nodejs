import { Question } from "../../enterprise/entities/question";

export interface QuestionRepository {
    create(question: Question): Promise<void>;
    findBySlug(slug: string): Promise<Question | null>;
    deleteById(question: Question): Promise<void>;
    findById(id: string): Promise<Question | null>;
}