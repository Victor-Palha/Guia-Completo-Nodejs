import { app } from "./app";

//Iniciando aplicação
app.listen({
    host: '0.0.0.0',
    port: 5000
}).then(()=>{
    console.log('Server is running on port 5000')
})