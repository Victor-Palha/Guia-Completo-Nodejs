import fastify from "fastify";
import { UsersRoutes } from "./routes/users";

export const app = fastify()

//Routes
app.register(UsersRoutes, {
    prefix: '/users',
})