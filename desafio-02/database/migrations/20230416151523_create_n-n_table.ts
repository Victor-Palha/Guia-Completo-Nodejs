import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('items', table => {
        table.uuid('id_item').primary()
        table.text('name').notNullable()
        table.text('description').notNullable()
        table.date('date').notNullable()
        table.time('time').notNullable()
        table.boolean('in_diet').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('items')
}

