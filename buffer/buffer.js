const Buffer = require('buffer').Buffer

const buf = Buffer.from('Hello World') //transforma para binarios
console.log(buf)

//converte do buffer para uma string
console.log(buf.toString())
//Troca o tipo de formatação
console.log(buf.toString('utf16le'))
//verificando se é um buffer
console.log(Buffer.isBuffer(buf))
