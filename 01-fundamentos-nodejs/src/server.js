import http from 'node:http';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';


    const server = http.createServer(async (request, response) => {
        
        const {url, method} = request;
        //routes
        const route = routes.find(router =>{
            return router.path.test(url) && router.method === method;
        })
        if(route){
            const reqParams = url.match(route.path)
            
            //route & query
            const {query, ...params} = reqParams.groups

            request.params = params
            request.query = query ? extractQueryParams(reqParams.groups.query) : {}

            return route.handler(request, response)
        }

        return response.writeHead(404).end();
    });

    server.listen(5000, () => {
        console.log('Server is running on port 5000');
    });