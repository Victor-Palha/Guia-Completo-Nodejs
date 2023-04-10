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

    select(table, search){
        let data = this.#datas[table] ?? []
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
            return true
        }else{
            return false
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
            return true
        }else{
            return false
        }
    }
}