import { Knex } from 'knex'

type Users = {
    id_user: string
    username: string
    password: string
    created_at: string
}
type Items = {
    id_item: string
    name: string
    description: string
    date: string
    time: string
    in_diet: boolean
}
type Diets = {
    id_diet: string
    id_user: string
    id_item: string
}
declare module 'knex/types/tables' {
    export interface Tables {
        users: Users,
        items: Items,
        diets: Diets
    }
}
