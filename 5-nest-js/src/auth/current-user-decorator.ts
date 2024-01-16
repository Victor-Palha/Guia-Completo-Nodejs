import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { TokenPayload } from "./jwt-strategy";

export const CurrentUser = createParamDecorator((_: never, ctx: ExecutionContext)=>{
    const req = ctx.switchToHttp().getRequest()
    return req.user as TokenPayload
})