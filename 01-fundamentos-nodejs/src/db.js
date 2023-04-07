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

    select(table, search){
        let data = this.#database[table] ?? []
        if(search){
            data = data.filter(row =>{
                return Object.entries(search).some(([key, value]) => {
                    return String(row[key]).toLowerCase().includes(value.toLowerCase())
                })
            })
        }
        return data
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
    update(table, id, {name, age}){
        const data = this.#database[table]
        
        const index = data.findIndex(item => item.id === id)
        if(index > -1){
            if(name){
                data[index].name = name
            }
            if(age){
                data[index].age = age
            }
            this.#persist()
        }
    }
}