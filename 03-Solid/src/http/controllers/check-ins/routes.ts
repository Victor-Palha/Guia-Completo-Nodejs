import { verifyJWT } from "@/http/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { createCheckIn } from "./create"
import { validateCheckIn } from "./validate"
import { historyCheckIn } from "./history"
import { userCheckInMetrics } from "./metrics"

export async function checkInsRoutes(app: FastifyInstance){
    app.addHook("onRequest", verifyJWT)

    app.get("/check-ins/history", historyCheckIn)
    app.get("/check-ins/metrics", userCheckInMetrics)

    app.post("/gyms/:gymId/check-ins", createCheckIn)
    app.patch("/check-ins/:checkInId/validate", validateCheckIn)
}