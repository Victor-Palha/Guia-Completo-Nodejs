import { FastifyInstance } from "fastify"
import { verifyJWT } from "../../middlewares/verify-jwt"
import { gymSearch } from "./gymSearchController"
import { gymNearby } from "./gymNearbyController"
import { gymCreate } from "./gymsCreateController"

export async function gymsRoutes(app: FastifyInstance){
    app.addHook("onRequest", verifyJWT)

    app.post("/gyms", gymCreate)
    app.get("/gyms/search", gymSearch)
    app.get("/gyms/nearby", gymNearby)
}