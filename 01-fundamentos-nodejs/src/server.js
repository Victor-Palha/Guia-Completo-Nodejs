import http from 'node:http';
import { PostUsers } from './middlewares/users.js';
import { Database } from './db.js';

    const db = new Database();

    const server = http.createServer(async (request, response) => {
        
        const {url, method} = request;
        const users = JSON.stringify(db.select('users'))

        // console.log(users)
        if(url === '/users' && method === 'GET'){
            console.log(db.database)
            return response.writeHead(200,{'content-type':'application/json'}).end(users);
        }

        
        if(url === '/users' && method === 'POST'){
            await PostUsers(request, response, db)
            //console.log(request.body)
            if(request.body != null){

                db.insert('users', request.body);

                return response.writeHead(201).end(JSON.stringify(request.body));
            }

            return response.writeHead(400).end('Invalid user')
        }

        return response.writeHead(404).end();
    });

    server.listen(5000, () => {
        console.log('Server is running on port 5000');
    });