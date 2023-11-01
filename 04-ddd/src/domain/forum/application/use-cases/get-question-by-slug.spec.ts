import { expect, test, describe, it, beforeEach } from "vitest";
import { QuestionRepository } from "../repositories/question-repository";
import { CreateQuestionUseCase } from "./create-question";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { MakeQuestion } from "../../../../../test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get Question By Slug", () => {
    beforeEach(()=>{
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
    })
    it("should be able to get a question by slug", async () => {
    
        const newQuestion = MakeQuestion({
            slug: Slug.create("example-question-test")
        });

        inMemoryQuestionsRepository.create(newQuestion);

        const {question} = await sut.execute({
            slug: "example-question-test"
        });
    
        expect(question.id).toBeTruthy();
    })
})
