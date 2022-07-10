function soma(x){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(x + 100)
        }, 3000)
    })
}
soma(566).then((resultado)=>{
    console.log(`Promise entregue com sucesso, o resultado é: ${resultado}`)
})