import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/questions")
@UseGuards(AuthGuard("jwt"))
export class CreateQuestionController{
    constructor(){}
    @Get()
    async execute(){
        return "Hello World"
    }
}