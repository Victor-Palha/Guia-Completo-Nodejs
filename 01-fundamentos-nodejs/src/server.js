import http from 'node:http';

    const users = [
        {name: 'Diego', age: 23},
        {name: 'Cleiton', age: 25},
        {name: 'Robson', age: 27},
        {name: 'Daniel', age: 20},
        ]

    const server = http.createServer((request, response) => {
        const {url, method} = request;

        if(url === '/users' && method === 'GET'){
            return response.writeHead(200,{'content-type':'application/json'}).end(JSON.stringify(users));
        }
        if(url === '/users' && method === 'POST'){
            users.push({name: 'Novo usuário', age: 30});
            return response.writeHead(201,{'content-type':'application/json'}).end(JSON.stringify(users));
        }

        return response.writeHead(404).end();
    });

    server.listen(5000, () => {
        console.log('Server is running on port 5000');
    });