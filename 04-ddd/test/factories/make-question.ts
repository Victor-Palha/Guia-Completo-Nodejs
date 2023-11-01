import {faker} from "@faker-js/faker";

import { UniqueEntityId } from "../../src/domain/core/entities/unique-entity-id";
import { Question, QuestionProps } from "../../src/domain/forum/enterprise/entities/question";

export function MakeQuestion(
    override: Partial<QuestionProps> = {},
    id?: UniqueEntityId,
){
    const question = Question.create({
        authorID: new UniqueEntityId(),
        title: faker.lorem.sentence(),
        content: faker.lorem.text(),
        ...override
    }, id)

    return question
}