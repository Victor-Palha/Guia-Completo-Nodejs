//Buscando, lendo e deletando arquivo com NODE.JS
const fs = require('fs')
fs.readdir(__dirname, (err, data)=>{
    if(err) throw err

    data.forEach((files)=>{
        if(files == 'teste.txt'){
            fs.readFile(files, (erro, dados)=>{
                if(erro) throw erro
                console.log(dados.toString())
                if(dados){
                    fs.unlink('teste.txt', (err, data)=>{
                        if(err) throw err
                        console.log(`Deletando arquivo`)
                    })
                }
            })
        }
        console.log(`|${files}`)
    })
})