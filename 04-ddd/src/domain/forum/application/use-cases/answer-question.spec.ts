import {beforeEach, describe, expect, it, test} from "vitest"
import { AnswerQuestionUseCase } from "./answer-question"
import { AnswerRepository } from "../repositories/answers-repository"
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase
describe("Answer Question", ()=>{
    beforeEach(()=>{
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
    })
    it("Should be able to Answer a question", async ()=>{
        
        const {answer} = await sut.execute({
            authorID: "any_id",
            questionID: "any_id",
            content: "any_content"
        })
    
        expect(answer.content).toBe("any_content")
    })
})