import { FastifyInstance } from "fastify"
import { userRegister } from "./controllers/userRegisterController"
import { AuthUser } from "./controllers/userAuthController"

export async function appRoutes(app: FastifyInstance){

    app.post("/users", userRegister)
    app.post("/sessions", AuthUser)
    
}