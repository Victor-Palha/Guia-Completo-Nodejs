const path = require('path')
//basename: trás somente o nome base de um arquivo
console.log(path.basename('C:/Users/ashpa/Desktop/Node/path/path.js'))
//normalize: tratamento de url
console.log(path.normalize('C://Users////ashpa/Desktop////Node//////path///path.js'))

//join: montar url
const {readFile} = require('fs').promises
const {readdir} = require('fs').promises
async function ler(){
    const data = await readdir(__dirname)
    return data
}
try {
    ler().then(data=>{
        var url = ''
        data.forEach(element => {
            url = path.join(url, element)
        });
        console.log('join: ', path.normalize(url))
    })
} catch (error) {
    console.log(error)
}

//resolve: trás o caminho absoluto de onde o código está sendo executado

console.log('resolve: ',path.resolve('teste'))

//extname: pega a extenção de um arquivo

console.log('extenção', path.extname('nomedeumarquivomuitogrande.jpg'))