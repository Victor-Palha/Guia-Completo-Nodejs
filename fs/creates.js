const fs = require('fs')

const pastas = ['css', 'js', 'fonts', 'imgs']

function make(array){
        array.forEach(element => {fs.mkdir(`projeto/${element}`,{recursive: true}, (err)=>{
            if(err) throw err
        })})
        setTimeout(()=>{
            fs.writeFile('./projeto/index.html',
`<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Documento</title>
    </head>
    <body>
        <h1>Hello World</h1>
    </body>
</html>`, 
            (err)=>{
                if(err) throw err
            })
        }, 2000)
    }

make(pastas)

/* */
/*fs.mkdir('teste/teste2/teste3',{recursive: true},(err)=>{
    if(err) throw err
    console.log('Pasta Criada!')
})
*/