import { FastifyInstance } from "fastify"
import { userRegister } from "./controllers/userRegisterController"
import { AuthUser } from "./controllers/userAuthController"
import { UserProfile } from "./controllers/userProfileController"

export async function appRoutes(app: FastifyInstance){

    app.post("/users", userRegister)
    app.post("/sessions", AuthUser)
    app.get("/me", UserProfile)
    
}