import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import { Env } from "src/env";
import { z } from "zod";

const TokenSchema = z.object({
    sub: z.string().uuid()
})

type TokenPayload = z.infer<typeof TokenSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(public config: ConfigService<Env, true>){
        const publicKey = config.get("JWT_PUBLIC_KEY", {infer: true});
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: Buffer.from(publicKey, "base64"),
            algorithms: ["RS256"]
        })

    }

    async validate(payload: TokenPayload){
        return TokenSchema.parse(payload)
    }
}