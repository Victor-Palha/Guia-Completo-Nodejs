import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('diets', table => {
        table.uuid('id_diet').primary()
        table.uuid('id_user').notNullable()
        table.uuid('id_item').notNullable()
        table.foreign('id_user').references('id_user').inTable('users')
        table.foreign('id_item').references('id_item').inTable('item')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('diets')
}

