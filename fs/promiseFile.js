const fs = require('fs')

function write(name, content){
    return new Promise((resolve, reject)=>{
        fs.writeFile(name, content, (err)=>{
            if(err) return reject
            resolve()
        })
    })
}

write('promiseFile.txt', 'arquivo escrito por uma promise')
.then(()=> console.log('tudo certo!'))
.catch(err => console.log('deu ruim!'))