import http from 'node:http';

const server = http.createServer((req, res)=>{
    res.end('Hello World');
})

server.listen(5000, () => {
    console.log('Server on port 5000')
})