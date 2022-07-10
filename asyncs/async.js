/*
// Conexão com banco de dados MySQL
async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:@localhost:3306/decks");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}
// Query ao Banco de dados
async function selectCustomers(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM deck;');
    return rows;
}
//Pegando valor expecifico
async function getDatabase(){
    const clientes = await selectCustomers();
    return clientes[0]['id']
}
*/

function sum(x){
    return new Promise((resolve, reject)=>{
        if(Number(x) == NaN || Number(x) == undefined || typeof x != 'number'){
            reject('BURRICE. Meu amigo, tu é idiota! é uma soma cacete, pq tu botou uma string?')
        }
        setTimeout(()=>{
            resolve(x+100)
        }, 3000)
    })
}

async function main(){
    try {
        const result = await sum('asc')
        console.log(result)
    } catch (err) {
        console.log(`ERRO DE: ${err}`)
        console.log(`TU É IDIOTA, TU MESMO ${process.env.USERNAME}`)
    }
}
main()