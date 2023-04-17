import { knex } from "../database";
import { z } from "zod";
import { FastifyInstance } from "fastify";
import { randomUUID } from "crypto";
import { authValidate } from "../middlewares/authValidate";
import { itemValidate } from "../middlewares/itemValidate";

type Sequence = {
    sequence: string
}

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
            name: z.string().optional(),
            description: z.string().optional(),
            date: z.string().optional(),
            time: z.string().optional(),
            in_diet: z.coerce.boolean().optional(),
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
    // get the sum of all items in diet
    app.get('/sum', async (req, res) => {
        const sum = await knex('diets').where('id_user', req.user_id)
        return res.status(200).send({ total: sum.length })
    })
    // get all healthy items
    app.get('/healthy', async (req, res) => {
        const healthy = await knex('diets').where( 'id_user', req.user_id )
            .join('items', 'diets.id_item', 'items.id_item')
            .where('in_diet', true)

        return res.status(200).send({ healthy: healthy.length })
    })
    // get all no healthy items
    app.get('/unhealthy', async (req, res) => {
        const unhealthy = await knex('diets').where( 'id_user', req.user_id )
            .join('items', 'diets.id_item', 'items.id_item')
            .where('in_diet', false)

        return res.status(200).send({ unhealthy: unhealthy.length })
    })
    // best sequence
    app.get('/sequence', async (req, res) => {
        const sequence = await knex('diets')
            .where( 'id_user', req.user_id )
            .join('items', 'diets.id_item', 'items.id_item')
            .where('in_diet', true)
            .orderBy('date')
            .groupBy('date')
            .select(knex.raw('group_concat(date) as sequence'))

            
        const result = sequence.map( (item: any) => {
            let total = item.sequence.split(',')
            return {
                day: total[0],
                sequence: total.length
            }
        })
        return res.status(200).send( result )
    })
}