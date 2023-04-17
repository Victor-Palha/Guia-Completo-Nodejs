import { knex } from "../database";
import { z } from "zod";
import { FastifyInstance } from "fastify";
import { randomUUID } from "crypto";
import { authValidate } from "../middlewares/authValidate";
import { itemValidate } from "../middlewares/itemValidate";

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
    app.delete('/:id', { preHandler: [itemValidate]}, async (req, res) => {
        const deleteItemSchema = z.object({
            id: z.string()
        })

        const id_item = deleteItemSchema.parse(req.params).id

        await knex('diets').where('id_item', id_item).delete()
        await knex('items').where('id_item', id_item).delete()
        return res.status(200).send({ message: 'Item Deleted!' })
    })

    //select unique item
    app.get('/:id', { preHandler: [itemValidate]}, async (req, res) => {
        const selectItemSchema = z.object({
            id: z.string()
        })
        const id_item = selectItemSchema.parse(req.params).id

        const item = await knex('items').where('id_item', id_item)
        return res.status(200).send({ item })
    })
    // Update item
    app.put('/:id', { preHandler: [itemValidate]}, async (req, res) => {
        const selectItemIdSchema = z.object({
            id: z.string()
        })
        const updateItemSchema = z.object({
            name: z.string(),
            description: z.string(),
            date: z.string(),
            time: z.string(),
            in_diet: z.coerce.boolean(),
        })
        const id_item  = selectItemIdSchema.parse(req.params).id
        
        const { name, description, date, time, in_diet } = updateItemSchema.parse(req.body)

        await knex('items').where('id_item', id_item).update({
            name,
            description,
            date,
            time,
            in_diet
        })
        return res.status(200).send({ message: 'Item Updated!' })
    })

}