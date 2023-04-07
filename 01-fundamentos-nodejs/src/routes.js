import { PostUsers } from "./middlewares/users.js";
import {Database} from './db.js';
import { buildRoutePath } from "./utils/build-route-path.js";

const db = new Database();

export const routes = [
    {
        path: buildRoutePath('/users'),
        method: 'GET',
        handler: (request, response) => {
            const {search} = request.query;
            //console.log(search)
            const users = db.select('users', search ? {
                name: search,
                age: search
            } : false)
            return response.writeHead(200,{'content-type':'application/json'}).end(JSON.stringify(users));
        }
    },{
        path: buildRoutePath('/users'),
        method: 'POST',
        handler: async (request, response) => {
            await PostUsers(request, response, db)
            if(request.body != null){

                db.insert('users', request.body);

                return response.writeHead(201).end(JSON.stringify(request.body));
            }

            return response.writeHead(400).end('Invalid user')
        }
    },{
        path: buildRoutePath('/users/:id'),
        method: 'DELETE',
        handler: (request, response) => {
            const {id} = request.params;
            db.delete('users', id)
            return response.writeHead(204).end();
        }
    },{
        path: buildRoutePath('/users/:id'),
        method: 'PUT',
        handler: async (request, response) => {
            await PostUsers(request, response, db)
            const {id} = request.params;
            const {name, age} = request.body;
            db.update('users', id, {name, age})
            return response.writeHead(204).end();
        }
    }
]