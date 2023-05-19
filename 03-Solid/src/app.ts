import fastify from "fastify"
import { usersRoutes } from "./http/controllers/users/routes"
import { ZodError } from "zod"
import { env } from "./env"
import fastifyJwt from "@fastify/jwt"
import fastifyCookie from "@fastify/cookie"
import { gymsRoutes } from "./http/controllers/gyms/routes"
import { checkInsRoutes } from "./http/controllers/check-ins/routes"

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie:{
        cookieName: "refreshToken",
        signed: false,
    },
    sign:{
        expiresIn: "10m",
    }
})
app.register(fastifyCookie)
app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

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