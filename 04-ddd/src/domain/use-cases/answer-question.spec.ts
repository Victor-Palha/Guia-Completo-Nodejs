import {expect, test} from "vitest"
import { AnswerQuestionUseCase } from "./answer-question"
import { AnswerRepository } from "../repositories/answers-repository"


const fakeAnswerRepository: AnswerRepository = {
    async create(answer){
        return
    }
}
test("Should be able to Answer a question", async ()=>{
    const AnswerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

    const answer = await AnswerQuestion.execute({
        authorID: "any_id",
        questionID: "any_id",
        content: "any_content"
    })

    expect(answer.content).toBe("any_content")
})