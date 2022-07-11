/* Teste 1 de Promisify
const {promisify} = require('util')
const writeFile = promisify(require('fs').writeFile)
var content = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus eos nisi corrupti nemo cupiditate! Tempore, suscipit quidem cumque maiores ullam, voluptates ea nobis quia cum ipsam dolorem, repudiandae ratione expedita.`

writeFile('arquivo-teste.txt', content)
.then(()=>{
    console.log('Arquivo foi criado com sucesso')
}).catch((err)=>{
    console.log('Ops, deu erro! ${err}')
})
*/
// Teste 2 Ciando a base de um diretório de uma aplicação web completa!
const {promisify} = require('util')
const writeFile = promisify(require('fs').writeFile)
const mkdir = promisify(require('fs').mkdir)

const pastas = ['css', 'js', 'fonts', 'imgs']

function make(array){
        array.forEach(element => {mkdir(`projeto/${element}`,{recursive: true})
            .then(()=>{
            console.log('Diretórios criados')
            writeFile('./projeto/js/html.js', `
            const { read } = require('fs')
            const http = require('http')

            const { readFile } = require('fs').promises

            const hostname = '127.0.0.1'
            const port = 3000
            const url = 'http://\${hostname}:\${port}'

            let content = ''

            try {
                readFile('../index.html').then((data) => content = data)
            } catch (err) {
                err => console.log(err)
            }

            const server = http.createServer((req, res)=>{
                res.statusCode = 200
                res.setHeader('Content-Type', 'text/html')
                res.end(content)
            })

            server.listen(port, hostname,()=>{
                console.log('Server Online')
            })`)
            .then(()=>{
                console.log('Arquivo JS criado com sucesso')
            })
            writeFile('./projeto/index.html',
            `<!DOCTYPE html>
            <html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="css/home.css">
                    <title>Documento</title>
                </head>
                <body>
                    <h1>Hello World</h1>
                    <p>Criado por Victor Ash Palha</p>
                </body>
            </html>`).then(()=>{
                console.log('Arquivo HTML criado com sucesso')
            })
            .catch((err)=>{
                console.log(`Erro ao criar os diretórios: ${err}`)
            })
            writeFile('./projeto/conection.php',
            `
            <?php
            $server = "localhost"; //Servidor onde está sua base de dados
            $username = "root"; //Nome de usuário da sua base de dados
            $password = ""; //Sua senha (caso não tenha, mantenha vazio)
            $dbname = ""; //Nome do seu banco de dados (NÃO DA TABELA, O BANCO!)
            try {
                $conn = new PDO(
                    "mysql:host=$server;dbname=$dbname",
                    "$username","$password"
                );
            }
            catch(PDOException $e) {
                die('Unable to connect with the database');
            }
            `).then(()=>{
                console.log('Arquivo PHP criado com sucesso')
            })
            .catch((err)=>{
                console.log(`Erro ao criar os diretórios: ${err}`)
            })
            writeFile('./projeto/css/home.css',
            `
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            `).then(()=>{
                console.log('Arquivo CSS criado com sucesso')
            })
            .catch((err)=>{
                console.log(`Erro ao criar os diretórios: ${err}`)
            })
        }).catch((err)=>{
            console.log(`Erro ao criar os diretórios: ${err}`)
        })})
    }

make(pastas)