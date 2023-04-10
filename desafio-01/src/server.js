import http from 'node:http';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

const server = http.createServer((request, response) => {
    const {method, url} = request
    //routes
    const route = routes.find(router =>{
        return router.path.test(url) && router.method === method;
    })
    if(route){
        const RouteParams = url.match(route.path)
        //route & query
        const {query, ...params} = RouteParams.groups

        request.params = params
        
        request.query = query ? extractQueryParams(RouteParams.groups.query) : {}

        return route.handle(request, response)
    }
    response.writeHead(404).end("Route not found");
})

server.listen(3000, ()=>{
    console.log('Server running on port 3000');
})