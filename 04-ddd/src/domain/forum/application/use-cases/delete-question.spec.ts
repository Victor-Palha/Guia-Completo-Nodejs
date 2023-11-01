import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository";
import { DeleteQuestionUseCase } from "./delete-question";
import { MakeQuestion } from "../../../../../test/factories/make-question";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";


let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe("Delete Question", ()=>{
    beforeEach(()=>{
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
    })

    it("Should be able to delete a question", async ()=>{
        const newQuestion = MakeQuestion({
            authorID: new UniqueEntityId("author-123")
        }, new UniqueEntityId("question-123"))

        await inMemoryQuestionsRepository.create(newQuestion);

        await sut.execute({
            questionId: "question-123",
            authorId: "author-123"
        });

        expect(inMemoryQuestionsRepository.items).toHaveLength(0);
        
    })

    it("Should not be able to delete a question from another user", async ()=>{
        const newQuestion = MakeQuestion({
            authorID: new UniqueEntityId("author-1")
        }, new UniqueEntityId("question-123"))

        await inMemoryQuestionsRepository.create(newQuestion);

        expect(async ()=>{
            await sut.execute({
                questionId: "question-123",
                authorId: "author-123"
            });
        }).rejects.toThrow("You can't delete this question");
        
    })
})