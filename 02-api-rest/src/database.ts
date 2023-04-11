import 'dotenv/config'
import { knex as setupKnex, Knex } from 'knex'
//  Config
export const config: Knex.Config = {
    //  nome do banco de dados
    client: process.env.DATABASE_URL as string,
    //  tipo de conexão
    connection: {
        //  caminho do arquivo
        filename: process.env.DATABASE_URL as string,
    },
    //  configurações do banco de dados
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db/migrations',
    },
}
// Exportando conexão
export const knex = setupKnex(config)
