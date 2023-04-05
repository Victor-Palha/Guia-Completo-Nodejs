import fs from 'node:fs';
    import http from 'node:http';

    const server = http.createServer((request, response) => {
        const {url, method} = request;

        if(url === '/users' && method === 'GET'){
            const readableStream = fs.createReadStream('./users.json');
            readableStream.pipe(response);
        }
    });

    server.listen(5000, () => {
        console.log('Server is running on port 5000');
    });