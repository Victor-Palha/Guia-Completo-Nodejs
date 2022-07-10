const eventer = require('events')

const meuEvento = new eventer()

meuEvento.on('Evento_deck', (x, y)=>{
    console.log(`Buscando o deck`)
    console.log(x+y)
})
meuEvento.emit('Evento_deck', 5, 661)