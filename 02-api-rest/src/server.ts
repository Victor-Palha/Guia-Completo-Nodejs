import { env } from './env'
import { app } from './app'
// Iniciando Servidor
app.listen({ port: env.PORT }).then(() => {
    console.log('Servidor rodando na porta 5000')
})
