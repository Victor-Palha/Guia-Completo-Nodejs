
//Criando função para utilizar callback
function soma(x, callback){
    return setTimeout(()=>{
        return callback(null, x + 100) 
    }, 3000) 
}
//Criando callBack
function resolveSoma(err, ress){
    if(err) throw err
    console.log(`O resultado da soma é ${ress}`)
}

soma(566, resolveSoma)