import { FastifyRequest, FastifyReply } from 'fastify'

export async function validCookie(req: FastifyRequest, res: FastifyReply) {
    const sessionId = req.cookies.session_id

    if (!sessionId) {
        return res.status(401).send({ error: 'Unauthorized' })
    }
}
