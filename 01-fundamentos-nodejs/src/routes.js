import { PostUsers } from "./middlewares/users.js";
import {Database} from './db.js';

const db = new Database();

export const routes = [
    {
        path: '/users',
        method: 'GET',
        handler: (request, response) => {
            const users = JSON.stringify(db.select('users'))
            return response.writeHead(200,{'content-type':'application/json'}).end(users);
        }
    },{
        path: '/users',
        method: 'POST',
        handler: async (request, response) => {
            await PostUsers(request, response, db)
            if(request.body != null){

                db.insert('users', request.body);

                return response.writeHead(201).end(JSON.stringify(request.body));
            }

            return response.writeHead(400).end('Invalid user')
        }
    }
]