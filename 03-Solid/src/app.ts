import fastify from "fastify"
import { appRoutes } from "./http/routes"
import { ZodError } from "zod"
import { env } from "./env"
import fastifyJwt from "@fastify/jwt"

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.register(appRoutes)

app.setErrorHandler((error, _req, res)=>{
    if(error instanceof ZodError){
        return res.status(400).send({error: "Validation Error", details: error.issues})
    }

    if(env.NODE_ENV !== "production"){
        console.error(error)
    } else{
        //
    }

    return res.status(500).send({message: "Internal Server Error"})
})