import fs from "node:fs/promises";
//Path to folder data
const databasePath = new URL("./data/tasks.json", import.meta.url)

export class Database{
    #datas = {}
    constructor(){
        fs.readFile(databasePath, "utf8").then((data)=>{
            this.#datas = JSON.parse(data)
        }).catch(()=>{
            this.#persist()
        })
    }

    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#datas))
    }

    select(table){
        let data = this.#datas[table] ?? []
        return data
    }

    insert(table, data){
        if(Array.isArray(this.#datas[table])){
            this.#datas[table].push(data)
        }else{
            this.#datas[table] = [data]
        }
        this.#persist()
        return data
    }

    delete(table, id){
        const data = this.#datas[table]
        const index = data.findIndex((item) => item.id === id)
        if(index > -1){
            data.splice(index, 1)
            this.#persist()
        }
    }

    update(table, id, updated){
        const data = this.#datas[table]
        const index = data.findIndex((item)=> item.id === id)
        if(index > -1){
            if(updated.title != undefined){
                data[index].title = updated.title
            }
            if(updated.description != undefined){
                data[index].description = updated.description
            }
            if(updated.completed_at != undefined){
                data[index].completed_at = updated.completed_at
            }
            if(updated.updated_at != undefined){
                data[index].updated_at = updated.updated_at
            }
            this.#persist()
        }
    }
}