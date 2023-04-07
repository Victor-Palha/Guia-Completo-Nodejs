import { buildRoutePath } from "../../01-fundamentos-nodejs/src/utils/build-route-path.js";
import { Database } from "./database.js";
import { ValidTask } from "./middlewares/ValidTask.js";
import { updateTask } from "./middlewares/updateTask.js";
const database = new Database()

export const routes = [
    {
        path: buildRoutePath('/tasks'),
        method: 'GET',
        handle: (req, res) => {
            const {search} = req.query;
            const tasks = database.select('tasks', search ? {
                title: search,
                description: search
            } : false)
            return res.writeHead(200,{'content-type':'application/json'}).end(JSON.stringify(tasks));
        }
    },{
        path: buildRoutePath('/tasks'),
        method: 'POST',
        handle: async (req, res)=>{
            await ValidTask(req, res, database)
            if(req.body != null){
                database.insert('tasks', req.body);
                return res.writeHead(201).end(JSON.stringify(req.body));
            }else{
                return res.writeHead(400).end('Invalid task')
            }
            
        }
    },{
        path: buildRoutePath('/tasks/:id'),
        method: 'PUT',
        handle: async (req, res)=>{
            await updateTask(req, res, database)
            const {id} = req.params
            const updated = req.body
            console.log(updated)
            database.update('tasks', id, updated)
            return res.writeHead(201).end();
        }
    },{
        path: buildRoutePath('/tasks/:id'),
        method: 'DELETE',
        handle: async (req, res)=>{
            await ValidTask(req, res, database)
            const {id} = req.params;
            database.delete('tasks', id)
            return res.writeHead(204).end();
        }
    },{
        path: buildRoutePath('/tasks/:id/completed'),
        method: 'PATCH',
        handle: (req, res)=>{
            
        }
    }
]