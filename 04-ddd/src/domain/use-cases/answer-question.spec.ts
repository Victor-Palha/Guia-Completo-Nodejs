import {it, expect} from "vitest"
import { AnswerQuestionUseCase } from "./answer-question"

it("should be able to answer a question", ()=>{
    const answerQuestion = new AnswerQuestionUseCase()

    const answer = answerQuestion.execute({
        instructorId: "1",
        questionId: "1",
        answerContent: "Answer"
    })

    console.log(answer)
    expect(answer.content).toEqual("Answer")
})