import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/auth/current-user-decorator";
import { TokenPayload } from "src/auth/jwt-strategy";

@Controller("/questions")
@UseGuards(AuthGuard("jwt"))
export class CreateQuestionController{
    constructor(){}
    @Get()
    async execute(@CurrentUser() user: TokenPayload){
        return user.sub
    }
}