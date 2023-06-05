import { AnswerQuestionUseCase } from "./answer-question"
import { AnswersRepository } from "../repositories/answers-repository"
import { Answer } from "../entities/answer"

const fakeAnswersRepository: AnswersRepository = {
    create: async (answer:Answer) => {
        return
    }
}
describe("", ()=>{
    it("Create an Answer", async ()=>{
        const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

        const answer = await answerQuestion.execute({instructorId: "1", questionId: "1", content: "Answer Content"})

        expect(answer.content).toBe("Answer Content")
    })
})