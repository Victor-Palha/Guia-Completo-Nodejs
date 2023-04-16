import { FastifyRequest } from 'fastify'

declare module 'fastify/types/request.d.ts' {
    export interface FastifyRequest {
        user_id: string
    }
}