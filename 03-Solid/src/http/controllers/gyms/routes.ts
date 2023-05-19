import { FastifyInstance } from "fastify"
import { verifyJWT } from "../../middlewares/verify-jwt"
import { gymSearch } from "./gymSearchController"
import { gymNearby } from "./gymNearbyController"
import { gymCreate } from "./gymsCreateController"
import { verifyUserRole } from "@/http/middlewares/verify-user-role"

export async function gymsRoutes(app: FastifyInstance){
    app.addHook("onRequest", verifyJWT)

    app.post("/gyms", {onRequest: [verifyUserRole("ADMIN")]},gymCreate)
    app.get("/gyms/search", gymSearch)
    app.get("/gyms/nearby", gymNearby)
}