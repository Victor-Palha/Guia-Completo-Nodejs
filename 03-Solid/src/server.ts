import { app } from "./app"
import { env } from "./env"

//Iniciando aplicação
app.listen({
	host: "0.0.0.0",
	port: env.PORT
}).then(()=>{
	console.log("Server is running on port: "+env.PORT)
})