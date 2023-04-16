import { knex } from "../database";
import { z } from "zod";
import { FastifyInstance } from "fastify";
import { randomUUID } from "crypto";
import { authValidate } from "../middlewares/authValidate";

export async function ItemsRoutes(app: FastifyInstance){
    //middleware
    app.addHook('preHandler', authValidate)

    //Routes
    app.post('/', async (req, res) => {
        const createItemSchema = z.object({
            name: z.string(),
            description: z.string(),
            date: z.string(),
            time: z.string(),
            in_diet: z.coerce.boolean(),
        })
        //body validation
        const { name, description, date, time, in_diet } = createItemSchema.parse(req.body)

        const id_item = randomUUID()

        await knex('items').insert({
            id_item,
            name,
            description,
            date,
            time,
            in_diet
        })
        //get user id
        const id_user = req.user_id

        //create diet
        await knex('diets').insert({
            id_diet: randomUUID(),
            id_user,
            id_item: id_item
        })
        //return
        return res.status(201).send('Item Created!')
    })
    // get all items
    app.get('/', async (req, res) => {
        const diet = await knex('diets').select('items.*').where('id_user', req.user_id).join('items', 'diets.id_item', 'items.id_item')
        return res.status(200).send({ diet })
    })
    // Delete item
    app.delete('/:id', async (req, res) => {
        const deleteItemSchema = z.object({
            id: z.string()
        })
        const id_item = deleteItemSchema.parse(req.params).id

        const exits = await knex('diets').where('id_item', id_item)
        
        if(exits.length === 0 || !exits){
            return res.status(404).send({ error: 'Item not found!' })
        }

        await knex('diets').where('id_item', id_item).delete()
        await knex('items').where('id_item', id_item).delete()
        return res.status(200).send({ message: 'Item Deleted!' })
    })

}