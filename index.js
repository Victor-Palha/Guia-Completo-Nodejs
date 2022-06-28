const http = require('http')
const hostname = '127.0.0.1'
const port = 3000
const fs = require('fs')

const server = http.createServer(function(req, res){
    console.log(req.headers)
    fs.readFile('index.html',(err, data)=>{
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write(data)
        return res.end()
    })
})

server.listen(port, hostname, function(){
    console.log('Server on')
})