import fastify from "fastify";
import { UsersRoutes } from "./routes/users";
import { ItemsRoutes } from "./routes/items";

export const app = fastify()

//Routes
app.register(ItemsRoutes, {
    prefix: '/diet',
})
app.register(UsersRoutes, {
    prefix: '/users',
})