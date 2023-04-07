import fs from "node:fs/promises"

const databasePath = new URL('./data/db.json', import.meta.url)

export class Database{
    #database = {}

    constructor(){
        fs.readFile(databasePath, 'utf8').then(data => this.#database = JSON.parse(data)).catch(()=> this.#persist())
    }

    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table){
        return this.#database[table] ?? []
    }
    insert(table, data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }else{
            this.#database[table] = [data]
        }

        this.#persist()
        return data
    }
    delete(table, id){
        const data = this.#database[table]
        
        const index = data.findIndex(item => item.id === id)
        if(index > -1){
            data.splice(index, 1)
            this.#persist()
        }
    }
}