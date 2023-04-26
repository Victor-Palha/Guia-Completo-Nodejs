import { FastifyInstance } from "fastify"
import { userRegister } from "./controllers/userRegisterController"

export async function appRoutes(app: FastifyInstance){

    app.post("/users", userRegister)
    
}