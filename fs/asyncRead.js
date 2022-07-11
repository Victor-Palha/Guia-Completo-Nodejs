const fs = require('fs').promises

async function read(name){
    const data = await fs.readFile(name, 'binary')
    return new Buffer.from(data)
}
try {
    read('teste.txt').then((data) => console.log(data.toString()))
} catch (err) {
    console.log(err)
}