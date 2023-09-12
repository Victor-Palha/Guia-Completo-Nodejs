import { Question } from "../../enterprise/entities/question";

export interface QuestionRepository {
    create(question: Question): Promise<void>;
}