import { FastifyInstance } from "fastify"
import { userRegister } from "./userRegisterController"
import { AuthUser } from "./userAuthController"
import { UserProfile } from "./userProfileController"
import { verifyJWT } from "../../middlewares/verify-jwt"
import { refreshUser } from "./refresh"

export async function usersRoutes(app: FastifyInstance){

    app.post("/users", userRegister)
    app.post("/sessions", AuthUser)
    app.get("/me", {onRequest: [verifyJWT]},UserProfile)
    
    app.patch("/token/refresh", refreshUser)
}