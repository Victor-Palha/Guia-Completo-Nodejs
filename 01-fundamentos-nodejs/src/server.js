import http from 'node:http';
import { routes } from './routes.js';


    const server = http.createServer(async (request, response) => {
        
        const {url, method} = request;
        //routes
        const route = routes.find(router =>{
            return router.path === url && router.method === method;
        })
        if(route){
            return route.handler(request, response)
        }

        return response.writeHead(404).end();
    });

    server.listen(5000, () => {
        console.log('Server is running on port 5000');
    });