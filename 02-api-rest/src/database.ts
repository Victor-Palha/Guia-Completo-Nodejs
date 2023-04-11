import { knex as setupKnex, Knex } from 'knex'
//  Config
export const config: Knex.Config = {
    //  nome do banco de dados
    client: 'sqlite',
    //  tipo de conexão
    connection: {
        //  caminho do arquivo
        filename: './db/app.db',
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
