import { expect, test, describe, it, beforeEach } from "vitest";
import { QuestionRepository } from "../repositories/question-repository";
import { CreateQuestionUseCase } from "./create-question";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("Create Question", () => {
    beforeEach(()=>{
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
    })
    it("should be able to create a question", async () => {
    
        const question = await sut.execute({
            authorID: "123",
            content: "content",
            title: "title"
        })
    
        expect(question.question.id).toBeDefined();
    })
})
