import "@fastify/jwt"

declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: { id: number } | null,
        user:{
            sub: string,
            role: "ADMIN" | "MEMBER"
        }
    }
}