import fastify from 'fastify'

// Iniciando APP
const app = fastify()

// Rotas
app.get('/', async (req, res) => {
    return { message: 'Hello World' }
})

// Iniciando Servidor
app.listen({ port: 5000 }).then(() => {
    console.log('Servidor rodando na porta 5000')
})
