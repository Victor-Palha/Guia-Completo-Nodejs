import { FastifyRequest, FastifyReply } from "fastify";
import { verify } from "jsonwebtoken";
import { env } from "../env";

interface Payload{
    sub: string;
}

export async function authValidate(req: FastifyRequest, res: FastifyReply){
    //Get Token
    const authtoken = req.headers.authorization

    if(!authtoken) {
        return res.status(401).send({ error: "Unauthorized" })
    }
    const [, token] = authtoken.split(" ")
    try {
        //validate token
        const { sub } = verify(token, env.JWT_SECRET) as Payload

        req.user_id = sub
        
    } catch (error) {
        return res.status(401).send({ error: error })
    }
}