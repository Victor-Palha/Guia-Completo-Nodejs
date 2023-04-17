import { z } from "zod";
import { knex } from "../database";
import { FastifyReply, FastifyRequest } from "fastify";

export async function itemValidate(req: FastifyRequest, res:FastifyReply){
    const reqParamsSchema = z.object({
        id: z.string(),
    })

    const  user_id  = req.user_id
    const  id  = reqParamsSchema.parse(req.params).id
    
    const exits = await knex('diets').where({id_item: id, id_user: user_id})

    if(exits.length === 0 || !exits){
        return res.status(404).send({ error: 'Item not found!' })
    }
}