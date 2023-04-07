# Estudos Node.js Completo
![Node imagem](https://philna.sh/assets/posts/node-1305aa9ecfe75c279ce6772534e04dd5999ddd372dcf28ef41c2a9a84b5acdb1.png.webp)

## Instalando Node.js
* Guia de instalação: [Aqui!](https://efficient-sloth-d85.notion.site/Instalando-o-Node-e-o-NPM-d162e2582d5c48499bc6703526912456)
* Guia de instalação HTTPie: [Aqui!](https://httpie.io/docs/cli/installation)

## Fundamentos Node.js
1. Para começar um projeto vamos criar uma pasta chamada "01-fundamentos-nodejs" e dentro dela rodar o comando `npm init -y`;
2. Esse comando vai gerar um arquivo `package.json` que vai guardar informações importantes da nossa aplicação;
3. dentro da pasta "01-fundamentos-nodejs" vamos criar uma pasta chamada "src" e dentro dela um arquivo chamado `server.js`;
4. Agora podemos escrever código javascript dentro do arquivo `server.js`, exemplo:;
```js
    console.log('Hello World!');
```
5. Para executar o arquivo `server.js` vamos rodar o comando `node src/server.js`;
### Módulos
1. Existem 2 modos para importação de módulos no Node.js, o primeiro é o modo `CommonJS` e o segundo é o modo `ESModules`;
2. O modo `CommonJS` é o padrão do Node.js, para importar um módulo no modo `CommonJS` usamos o comando `require` e para exportar usamos o comando `module.exports`;
3. O modo `ESModules` é o padrão do Javascript, para importar um módulo no modo `ESModules` usamos o comando `import` e para exportar usamos o comando `export`;
4. Para usar o modo `ESModules` no Node.js precisamos adicionar o seguinte código no arquivo `package.json`:
```json
    "type": "module"
```
5. Nas novas versões do Node.js para importar um módulo nativo, ele pede para usar o comando `import` e não o comando `require`, porém antes do nome do módulo vamos adicionar o __prefixo__ `:node`, exemplo:
```js
    import http from 'node:http';
```
### Scripts automatizados
1. Para criar um script automatizado no Node.js vamos adicionar o seguinte código no arquivo `package.json`:
```json
    "scripts": {
        "dev": "node --watch src/server.js"
    }
```
3. O comando `--watch` vai ficar observando as alterações no arquivo `server.js` e vai executar o arquivo novamente sempre que houver uma alteração;
2. Agora podemos executar o script automatizado com o comando `npm run dev`;

### Projeto Fundamentos Node.js
1. Vamos criar um servidor HTTP com Node.js para testar os conhecimentos adquiridos;
2. Para isso vamos criar uma pasta chamada "01-fundamentos-nodejs" e dentro dela rodar o comando `npm init -y`;
3. Esse comando vai gerar um arquivo `package.json` que vai guardar informações importantes da nossa aplicação;
4. dentro da pasta "01-fundamentos-nodejs" vamos criar uma pasta chamada "src" e dentro dela um arquivo chamado `server.js`;
5. Agora podemos escrever código javascript dentro do arquivo `server.js`, exemplo:
```js
    import http from 'node:http';

    const server = http.createServer((request, response) => {
        response.end('Hello World!');
    });

    server.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
```
OBS: Para usar o comando `import` no Node.js precisamos adicionar o seguinte código no arquivo `package.json`:
```json
    "type": "module"
```

6. Para executar o arquivo `server.js` vamos ir no arquivo `package.json` e adicionar o seguinte código:
```json
    "scripts": {
        "dev": "node --watch src/server.js"
    }
```
7. Agora podemos executar o script automatizado com o comando `npm run dev`;
8. Para testar se o servidor está funcionando vamos abrir o navegador e acessar a url `http://localhost:3000`;

#### Explicando o código
1. O código acima é um servidor HTTP que vai responder com a mensagem "Hello World!" para qualquer requisição que ele receber;
2. Para criar um servidor HTTP usamos o comando `http.createServer` e passamos uma função como parâmetro;
3. Essa função vai receber 2 parâmetros, o primeiro é a requisição e o segundo é a resposta;
4. Para responder a requisição usamos o comando `response.end` e passamos a mensagem que queremos responder;
5. Para iniciar o servidor HTTP usamos o comando `server.listen` e passamos a porta que queremos que ele escute;

## O que são Rotas HTTP
1. Rotas HTTP são os caminhos que o usuário vai acessar na aplicação;
2. Exemplo de rotas HTTP:
3. Dentro de uma rota temos 2 componentes principais, o método HTTP e a URL;
4. O método HTTP é o verbo que vai definir o que a rota vai fazer, exemplo:
* `GET` - Buscar informações do back-end;
* `POST` - Criar uma informação no back-end;
* `PUT` - Alterar uma informação no back-end;
* `PATCH` - Alterar uma informação específica no back-end; `PATCH` é usado quando queremos alterar apenas uma informação, exemplo: `name` ou `email`;
* `DELETE` - Deletar uma informação no back-end;

5. A URL é o caminho que o usuário vai acessar na aplicação, exemplo:
* `/` - Rota raiz;
* `/users` - Rota de usuários;

### Headers
1. Headers são informações adicionais que o usuário pode enviar na requisição;
2. Exemplo de headers:
* `Content-Type` - Define o tipo de conteúdo que o usuário está enviando;
* `Authorization` - Define o token de autenticação do usuário;
* `Accept` - Define o tipo de conteúdo que o usuário está aceitando receber;    
3. Exemplo de headers enviados pelo servidor:
```js
    import http from 'node:http';

    const users = [
        {name: 'Diego', age: 23},
        {name: 'Cleiton', age: 25},
        {name: 'Robson', age: 27},
        {name: 'Daniel', age: 20},
        ]

    const server = http.createServer((request, response) => {
        return response.setHeader('Content-type', 'application/json').end(JSON.stringify(users));
    });

    server.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
```



### Projeto Rotas HTTP
1. Vamos voltar para o nosso projeto criado anteriormente e vamos verificar a rota e o método que o usuário está acessando atráves da requisição;
```js
    import http from 'node:http';

    const users = [
        {name: 'Diego', age: 23},
        {name: 'Cleiton', age: 25},
        {name: 'Robson', age: 27},
        {name: 'Daniel', age: 20},
        ]

    const server = http.createServer((request, response) => {
        const {url, method} = request;
        console.log(url, method);
        return response.setHeader('Content-type', 'application/json').end(JSON.stringify(users));
    });

    server.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
```
2. Agora vamos saber quais as rotas que estão sendo acessadas no nosso servidor!

### HTTP Status Code
1. HTTP Status Code são os códigos de status que o servidor HTTP retorna para o usuário;
2. Exemplo de HTTP Status Code:
* `100 - 199` - Informações;
* `200 - 299` - Sucesso;
* `300 - 399` - Redirecionamento;
* `400 - 499` - Erro do cliente;
* `500 - 599` - Erro do servidor;
3. Como enviar status HTTP pelo Nodejs, exemplo:
```js
    import http from 'node:http';

    const users = [
        {name: 'Diego', age: 23},
        {name: 'Cleiton', age: 25},
        {name: 'Robson', age: 27},
        {name: 'Daniel', age: 20},
        ]

    const server = http.createServer((request, response) => {
        const {url, method} = request;

        if(url === '/users' && method === 'GET'){
            return response.writeHead(200,{'content-type':'application/json'}).end(JSON.stringify(users));
        }
        if(url === '/users' && method === 'POST'){
            users.push({name: 'Novo usuário', age: 30});
            return response.writeHead(201,{'content-type':'application/json'}).end(JSON.stringify(users));
        }

        return response.writeHead(404).end();
    });

    server.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
```

## Introdução às Streams no Node.js
O Node.js é uma plataforma que fornece muitas funcionalidades úteis para lidar com I/O (entrada/saída), incluindo o uso de Streams. Uma Stream é uma sequência de dados que pode ser lida ou escrita em pedaços, em vez de lida ou escrita de uma só vez. O uso de Streams permite que o Node.js processe grandes volumes de dados de maneira eficiente, sem sobrecarregar a memória.

### Buffers
1. Buffers são uma sequência de bytes (números) que representam dados;
2. Exemplo de Buffer:
```js
    import {Buffer} from 'node:buffer';

    const buffer = Buffer.from('Hello World');
    console.log(buffer);
```

### Módulos Readable e Writable
No Node.js, existem dois módulos principais para trabalhar com Streams: Readable e Writable.

O módulo Readable é usado para ler dados de uma fonte, como um arquivo ou uma conexão de rede. Ele fornece vários métodos úteis para ler dados de uma Stream, incluindo:

* read(): lê dados da Stream em um tamanho específico ou até que a Stream seja esvaziada
* pipe(): encaminha dados de uma Stream para outra Stream, como o módulo Writable
* push(): adiciona dados à Stream para serem lidos
O módulo Writable é usado para gravar dados em uma Stream, como um arquivo ou uma conexão de rede. Ele fornece vários métodos úteis para gravar dados em uma Stream, incluindo:

* write(): escreve dados em uma Stream
* end(): sinaliza o final dos dados na Stream

### Comandos Pipe e Push
O método pipe() é um método de conveniência para encadear uma Stream Readable com uma Stream Writable. Ele permite que você leia os dados de uma Stream Readable e os escreva diretamente em uma Stream Writable. Aqui está um exemplo:

```js
const fs = require('fs');
const readableStream = fs.createReadStream('file.txt');
const writableStream = fs.createWriteStream('copy.txt');

readableStream.pipe(writableStream);
```

Neste exemplo, estamos criando uma Stream Readable a partir de um arquivo 'file.txt' e uma Stream Writable em um arquivo 'copy.txt'. Em seguida, estamos usando o método pipe() para encadear a Stream Readable na Stream Writable. Isso fará com que os dados do arquivo 'file.txt' sejam lidos e gravados no arquivo 'copy.txt'.

O método push() é usado para adicionar dados a uma Stream Readable para serem lidos. Você pode usar este método em conjunto com o método read() para ler dados em tamanhos específicos. Aqui está um exemplo:

````js
const { Readable } = require('stream');

const readableStream = new Readable({
  read(size) {
    this.push('hello ');
    this.push('world');
    this.push(null);
  }
});

readableStream.on('data', (chunk) => {
  console.log(chunk.toString());
});
````

Neste exemplo, estamos criando uma Stream Readable personalizada que adiciona os dados "hello " e "world" à Stream usando o método push(). Quando os dados são adicionados à Stream, a função de retorno de chamada read() é chamada e podemos ler os dados usando o método on('data'). No exemplo acima, estamos imprimindo os dados no console. O resultado da execução deste código será a string "hello world".

### Exemplo Readable Streams
```js
    import fs from 'node:fs';
    import http from 'node:http';

    const server = http.createServer((request, response) => {
        const {url, method} = request;

        if(url === '/users' && method === 'GET'){
            const readableStream = fs.createReadStream('./users.json');
            readableStream.pipe(response);
        }
    });

    server.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
```
Este código é um exemplo de como criar um servidor HTTP em Node.js e usar Streams para enviar um arquivo JSON como resposta para uma solicitação GET.

A primeira linha de código importa o módulo fs do Node.js, que é usado para ler e gravar arquivos. Em seguida, o módulo http também é importado para criar um servidor HTTP.

```javascript
import fs from 'node:fs';
import http from 'node:http';
```

Em seguida, um servidor HTTP é criado usando o método http.createServer(). A função de retorno de chamada do servidor é definida para lidar com solicitações HTTP recebidas pelo servidor.

```javascript
const server = http.createServer((request, response) => {
  // Código da função de retorno de chamada do servidor
});
```
A função de retorno de chamada recebe dois parâmetros: request e response. O parâmetro request contém informações sobre a solicitação HTTP recebida pelo servidor, como o URL e o método HTTP. O parâmetro response é usado para enviar uma resposta HTTP ao cliente.

```javascript
const {url, method} = request;
```
A primeira linha do código acima usa a sintaxe de desestruturação do JavaScript para extrair os valores de url e method do objeto request.

O código abaixo verifica se a solicitação recebida é uma solicitação GET para o URL /users. Se for esse o caso, o arquivo users.json será lido usando um Stream Readable e os dados serão enviados como resposta usando o método pipe().

```javascript
if(url === '/users' && method === 'GET'){
  const readableStream = fs.createReadStream('./users.json');
  readableStream.pipe(response);
}
```

O método fs.createReadStream() é usado para criar um Stream Readable que lê o arquivo users.json. O método pipe() é então usado para encadear o Stream Readable com o Stream Writable response, que é usado para enviar a resposta HTTP de volta para o cliente.

Por fim, o servidor é iniciado na porta 5000 usando o método server.listen().

```javascript
server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
```
Isso fará com que o servidor escute na porta 5000 e exiba a mensagem "Server is running on port 5000" no console.

## Middlewares
Um middleware é uma função que tem acesso ao objeto de solicitação **(req)**, ao objeto de resposta **(res)** e à próxima função de middleware no ciclo de solicitação-resposta do aplicativo. O middleware pode executar qualquer código, modificar os objetos de solicitação e resposta, encerrar o ciclo de solicitação-resposta e chamar a próxima função de middleware na pilha.
Podemos simplificar e dizer que um middleware é uma função que ocorre entre a requisição do cliente e a resposta do servidor. Podendo fazer muitas coisas, como por exemplo, interceptar uma requisição, fazer alguma validação, fazer alguma alteração no objeto de requisição entre outros.
### Projeto Middleware
Vamos voltar para o projeto que estamos trabalhando e criar um middleware para que o usuário coloque o nome e idade no **body** da requisição e para verificar se existe um nome igual já cadastrado, caso já tenha ele deve retornar um erro.
Um middleware fica separado do código em uma pasta chamada **middlewares**, assim temos uma organização melhor do código e com isso uma manutenção mais fácil!.

```js
// src/middlewares/users.js
export async function PostUsers(req, res, users) {
    const user = []
    for await (const chunk of req){
        user.push(chunk)
    }
    try {
        req.body = JSON.parse(Buffer.concat(user).toString())
        users.map((users)=>{
            if(users.name === req.body.name){
                req.body = null
            }
        })
    } catch{
        req.body = null
    }
    res.setHeader('content-type','application/json')
    
}
```
```js
// src/server.js
import http from 'node:http';
import { PostUsers } from './middlewares/users.js';

    const users = [
        {name: 'Diego', age: 23},
        {name: 'Cleiton', age: 25},
        {name: 'Robson', age: 27},
        {name: 'Daniel', age: 20},
        ]

    const server = http.createServer(async (request, response) => {
        const {url, method} = request;

        if(url === '/users' && method === 'GET'){
            return response.writeHead(200,{'content-type':'application/json'}).end(JSON.stringify(users));
        }
        if(url === '/users' && method === 'POST'){
            await PostUsers(request, response, users)
            if(request.body != null){
                users.push(request.body)
                return response.writeHead(201).end(JSON.stringify(users));
            }
            return response.writeHead(400).end('Invalid user')
        }

        return response.writeHead(404).end();
    });

    server.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
```
## Criando arquivos json para armazenar os dados
Vamos criar um arquivo chamado **users.json** na pasta **src** e vamos criar um array de objetos com os usuários.
Depois de criar o arquivo na raiz do projeto e nomea-lo de **db.js**, vamos simular uma estrutura de banco de dados com os métodos `insert`, `select`.
Dessa maneira os dados não vão ficar armazenados na memória, mas sim em um arquivo json, o que é muito mais seguro já que os dados não vão sumir quando o servidor for reiniciado. Mais tarde vamos entrar realmente em banco de dados, mas por enquanto vamos usar o arquivo json para simular um banco de dados.
```js
// src/db.js
export class Database{
    database = {}

    select(table){
        return this.database[table] ?? []
    }
    insert(table, data){
        if(this.database[table]){
            this.database[table].push(data)
        }else{
            this.database[table] = [data]
        }
        return data
    }
}
```
Nesse código acima, estamos criando uma classe chamada **Database** e dentro dela temos um método chamado **select** que recebe como parâmetro o nome da tabela e retorna os dados dessa tabela, caso não exista a tabela ele retorna um array vazio.
E também temos o método **insert** que recebe como parâmetro o nome da tabela e os dados que serão inseridos, caso a tabela não exista ele cria a tabela e insere os dados, caso a tabela já exista ele insere os dados na tabela.
Agora vamos importar o arquivo **db.js** no arquivo **server.js** e vamos usar o método **select** para retornar os dados da tabela **users**.
```js
    import http from 'node:http';
    import { PostUsers } from './middlewares/users.js';
    import { Database } from './db.js';

    const db = new Database();

    const server = http.createServer(async (request, response) => {
        
        const {url, method} = request;
        const users = JSON.stringify(db.select('users'))

        // console.log(users)
        if(url === '/users' && method === 'GET'){
            return response.writeHead(200,{'content-type':'application/json'}).end(users);
        }

        
        if(url === '/users' && method === 'POST'){
            await PostUsers(request, response, db)
            if(request.body != null){

                db.insert('users', request.body);

                return response.writeHead(201).end(JSON.stringify(request.body));
            }

            return response.writeHead(400).end('Invalid user')
        }

        return response.writeHead(404).end();
    });

    server.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
```
Nesse código vamos instanciar a classe **Database** e vamos usar o método **select** para retornar os dados da tabela **users**.
Agora dentro da rota **GET**, vamos enviar todos os dados que foram inseridos na tabela **users**.
E dentro da rota **POST**, vamos colocar a instancia do banco de dados como _parâmetro_ do middleware **PostUsers**.
Agora vamos para a pasta **middlewares** e vamos alterar o arquivo **users.js**.
```js
import {randomUUID} from 'crypto'

export async function PostUsers(req, res, db) {
    
    const users = db.select('users')

    const user = []
    for await (const chunk of req){
        user.push(chunk)
    }

    try {
        const newUser = JSON.parse(Buffer.concat(user).toString())
        newUser.id = randomUUID()

        const existingUser = Array.isArray(users) && users.find(user => user.name === newUser.name);

        if (existingUser) {
            req.body = null
        } else {
            req.body = newUser;
        }
        
    } catch{
        req.body = null
    }
    
}
```
Dentro dos parâmetros do middleware, vamos adicionar o banco de dados como parâmetro e vamos usar o método **select** para retornar os dados da tabela **users**.
Agora que já temos todos os dados na `const` **users**, vamos fazer uma válidação no nosso _try_.
Caso já exista um usuário com o mesmo nome registrado, ele vai retornar o `req.body` igual null, caso não exista ele vai retornar o `req.body` com os dados do novo usuário.
Assim já temos uma configuração de um mini sistema de banco de dados que salva os dados em uma variavel, mas isso não é uma boa prática, pois os dados vão sumir quando o servidor for reiniciado. Então vamos voltar para o arquivo `db.js` e vamos alterar o código para salvar os dados em um arquivo json.
```js
import fs from "node:fs/promises"

export class Database{
    #database = {}

    #persist(){
        fs.writeFile('db.json', JSON.stringify(this.#database))
    }

    select(table){
        return this.#database[table] ?? []
    }
    insert(table, data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }else{
            this.#database[table] = [data]
        }

        this.#persist()
        return data
    }
}
```
A alteração é bastante simples, vamos importar o modulo `fs` e vamos criar um método privado chamado **persist** que vai salvar os dados no arquivo **db.json**.
* **OBS: O _`#`_ antes do nome do método é para indicar que o método é privado. Você pode estudar um pouco mais sobre isso em Programação Orientada a Objetos, não iremos abordar isso aqui.**
O método **persist** vai ser chamado toda vez que uma informação nova for adicionada no banco de dados.
PRONTO, com poucas linhas de código já temos um sistema de banco de dados que salva os dados em um arquivo json. Mas ainda não acabou, calma ai! Vamos fazer mais algumas alterações para deixar o código mais organizado pois o arquivo **JSON** está sendo salva na raiz do projeto e isso não é uma boa prática, então vamos fazer mais algumas configurações para deixar o código mais organizado e o arquivo não está buscando o JSON já salvo, então vamos resolver esses 2 problemas.
* Primeiro, crie uma pasta no `src` do seu projeto chamada `data`.
```js
import fs from "node:fs/promises"

const databasePath = new URL('./data/db.json', import.meta.url)

export class Database{
    #database = {}

    constructor(){
        fs.readFile(databasePath, 'utf8').then(data => this.#database = JSON.parse(data)).catch(()=> this.#persist())
    }

    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table){
        return this.#database[table] ?? []
    }
    insert(table, data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }else{
            this.#database[table] = [data]
        }

        this.#persist()
        return data
    }
}
```
Para explicar o que está acontecendo aqui, vamos por partes.
1. Primeiro vamos criar uma constante chamada **databasePath** que vai receber o caminho do arquivo **db.json** utilizando a classe nativa do Node chamada de `URL` que recebe 2 parametros, sendo eles respectivamente:
* O prmeiro parametro é o caminho do arquivo que queremos buscar, ele é igual ao comando `cd` do terminal.
* O caminho do diretório atual do arquivo que está executando.
2. Criamos uma função construtora para a classe **Database** e dentro dela vamos usar o método **readFile** do modulo **fs** para ler o arquivo **db.json** e vamos usar o método **then** para pegar o resultado da leitura do arquivo e vamos usar o método **catch** para caso o arquivo não exista, ele vai criar um novo arquivo com o nome **db.json**.
Pronto, agora sim temos um projeto bem legal que aborda os conceitos de rotas, middlewares e banco de dados. Claro que ainda temos muito o que aprender, mas com esse projeto já conseguimos entender um pouco mais sobre esses conceitos fundamentais.

## Separando Rotas
Agora que já temos um middleware para validar os dados, podemos separar as rotas em um arquivo separado, assim temos um código mais organizado e com isso uma manutenção mais fácil.
Primeiro vamos criar um arquivo chamado **routes.js** na pasta **src** e vamos criar um array de objetos com as rotas e seus respectivos métodos.
```js
// src/routes.js
export const routes = [
    {
        path: '/users',
        method: 'GET',
        handler: (request, response) => {
            
        }
    },{
        path: '/users',
        method: 'POST',
        handler: (request, response) => {
            
        }
    }
]
```
O código acima é a base para a criação das rotas, agora vamos popularizar nosso métodos **handler** com as rotas que já temos.
```js
import { PostUsers } from "./middlewares/users.js";
import {Database} from './db.js';

const db = new Database();

export const routes = [
    {
        path: '/users',
        method: 'GET',
        handler: (request, response) => {
            const users = JSON.stringify(db.select('users'))
            return response.writeHead(200,{'content-type':'application/json'}).end(users);
        }
    },{
        path: '/users',
        method: 'POST',
        handler: async (request, response) => {
            await PostUsers(request, response, db)
            if(request.body != null){

                db.insert('users', request.body);

                return response.writeHead(201).end(JSON.stringify(request.body));
            }

            return response.writeHead(400).end('Invalid user')
        }
    }
]
```
O arquivo ficou um pouco maior, mas não se preocupe, vamos explicar o que está acontecendo aqui.
1. Primeiro vamos importar o middleware **PostUsers** e o banco de dados **Database**.
2. Depois vamos criar uma instância do banco de dados.
3. Depois vamos exportar o array de rotas.
4. Vamos popularizar o método **handler** da rota **GET**.
* Primeiro vamos pegar os usuários do banco de dados.
* Depois vamos converter o array de usuários para uma string.
* Depois vamos retornar o status **200** e o tipo de conteúdo **application/json**.
* Depois vamos retornar o array de usuários.
5. Vamos popularizar o método **handler** da rota **POST**.
* Primeiro vamos usar o middleware **PostUsers** para validar os dados.
* Depois vamos verificar se o corpo da requisição não é nulo.
* Depois vamos inserir os dados no banco de dados.
* Depois vamos retornar o status **201**.
* Depois vamos retornar o corpo da requisição.
6. Caso o corpo da requisição seja nulo, vamos retornar o status **400** e uma mensagem de erro.
Agora que já temos as rotas separadas, vamos importar o arquivo **routes.js** no arquivo **server.js** e vamos usar o método **find** do array para buscar a rota que foi requisitada.
```js
import http from 'node:http';
import { routes } from './routes.js';


    const server = http.createServer(async (request, response) => {
        
        const {url, method} = request;
        //routes
        const route = routes.find(router =>{
            return router.path === url && router.method === method;
        })
        if(route){
            return route.handler(request, response)
        }

        return response.writeHead(404).end();
    });

    server.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
```
O código acima é bem simples, vamos explicar o que está acontecendo aqui.
1. Primeiro vamos importar o array de rotas.
2. Depois vamos usar o método **find** do array para buscar a rota que foi requisitada.
3. Depois vamos verificar se a rota existe.
4. Caso a rota exista, vamos executar o método **handler** da rota.
5. Caso a rota não exista, vamos retornar o status **404**.
Pronto, agora nosso projeto já está bem organizado para podermos adicionar novas rotas e novos middlewares de maneira mais fácil e sem poluir um unico arquivo!

## Route, Query Params e Request Body
Antes de sairmos criando novas rotas, vamos aprender um pouco mais sobre os conceitos de **Route Params**, **Query Params** e **Request Body**.
### Route Params
Os **Route Params** são parâmetros que são passados na rota da requisição, por exemplo, se eu quiser pegar um usuário específico, eu vou passar o id do usuário na rota da requisição, exemplo: `http://localhost:5000/users/1`
1. Casos de uso:
* Identificar um recurso na alteração ou remoção.
* Paginação.
### Query Params
Os **Query Params** são parâmetros que são passados na rota da requisição, por exemplo, se eu quiser pegar um usuário específico, eu vou passar o id do usuário na rota da requisição, exemplo: `http://localhost:5000/users?id=1`
1. Casos de uso:
* Filtros.
* Paginação.
### Request Body
O **Request Body** é o corpo da requisição, ele é utilizado para enviar dados para o servidor, por exemplo, se eu quiser criar um usuário, eu vou passar os dados do usuário no corpo da requisição.
1. Casos de uso:
* Criar ou alterar um recurso.
## Criando novas rotas
Agora que já sabemos um pouco mais sobre os conceitos de **Route Params**, **Query Params** e **Request Body**, vamos criar novas rotas para o nosso projeto. Começando com uma rota `DELETE` para deletar um usuário.
* Primeiro vamos ter de ir no nosso arquivo **db.js** para criar um novo método para deletar um usuário.

```js
{
    path: '/users/:id',
    method: 'DELETE',
    handler: (request, response) => {
        return response.writeHead(200).end();
    }
}
```
Com a base da nossa rota criada, precisamos criar um modo para que o nosso servidor acesse o `:id` que é um **route param**. Para isso vamos criar uma nova pasta e nomea-la de **utils**, essa pasta vai ser criada no nosso diretório **src**.
1. Dentro da pasta **utils** vamos criar um novo arquivo e nomea-lo de **build-route-path.js**.
2. Dentro do arquivo vamos criar uma **Regex** para procurar dentro na url da requisição o `:id` e substituir por um valor que será passado como parâmetro.
    * Regex é uma expressão que é usada para procurar e substituir valores dentro de uma string.
```js
export function buildRoutePath(path){
    const routeParameterRegex = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeParameterRegex, '(?<$1>[a-z0-9\-_]+)')

    const pathRegex = new RegExp(`^${pathWithParams}$`)

    return pathRegex
}
```
Explicando o código acima:
1. Primeiro vamos criar uma **Regex** para procurar dentro na url da requisição qualquer valor que comece com `:algumaCoisa`.
2. Depois vamos pegar criar uma váriavel que vai receber a url da requisição e substituir o `:algumaCoisa` por um valor que será uma nova **Regex** que vai procurar qualquer valor que comece com `a-z`, `0-9`, `-` ou `_`.
3. Depois dessas informações já serem tratadas, vamos criar uma nova **Regex** que comece com as informações que já foram tratadas.
4. Depois vamos retornar a nova **Regex**.

```js
import http from 'node:http';
import { routes } from './routes.js';


    const server = http.createServer(async (request, response) => {
        
        const {url, method} = request;
        //routes
        const route = routes.find(router =>{
            //Aqui vamos verificar se a url da requisição contem alguma informação da Regex
            return router.path.test(url) && router.method === method;
        })
        if(route){
            //Aqui vamos pegar o valor do :idDinamico que foi passado na url da requisição
            const reqParams = url.match(route.path)
            request.params = {...reqParams.groups}
            return route.handler(request, response)
        }

        return response.writeHead(404).end();
    });

    server.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
```
* Agora que já temos a nossa **Regex** criada, vamos importar o arquivo **build-route-path.js** no arquivo **server.js** e vamos usar a nossa **Regex** para pegar o valor do `:id` que foi passado na url da requisição.
* Agora vamos atribuir o nosso valor do `:id` para o nosso objeto **request** utilizando `request.params = {...reqParams.groups}`.
* Depois de feito isso vamos para o arquivo **routes.js** e vamos atribuir nossa função ao nosso atributo **path**
```js
import { PostUsers } from "./middlewares/users.js";
import {Database} from './db.js';
import { buildRoutePath } from "./utils/build-route-path.js";

const db = new Database();

export const routes = [
    {
        path: buildRoutePath('/users'),
        method: 'GET',
        handler: (request, response) => {
            const users = JSON.stringify(db.select('users'))
            return response.writeHead(200,{'content-type':'application/json'}).end(users);
        }
    },{
        path: buildRoutePath('/users'),
        method: 'POST',
        handler: async (request, response) => {
            await PostUsers(request, response, db)
            if(request.body != null){

                db.insert('users', request.body);

                return response.writeHead(201).end(JSON.stringify(request.body));
            }

            return response.writeHead(400).end('Invalid user')
        }
    },{
        path: buildRoutePath('/users/:id'),
        method: 'DELETE',
        handler: (request, response) => {
            console.log(request.params)
            return response.writeHead(200).end('Delete user');
        }
    }
]
```
Nos vamos importar a nossa função **buildRoutePath** e vamos usar ela para criar uma nova **Regex** para cada rota que tiver um `:id` na url da requisição. Agora podemos acessar o valor do `:id` que foi passado na url da requisição utilizando `request.params`.
* Agora vamos voltar para o arquivo **db.js** e terminar nosso método para deletar um usuário.
```js
import fs from "node:fs/promises"

const databasePath = new URL('./data/db.json', import.meta.url)

export class Database{
    #database = {}

    constructor(){
        fs.readFile(databasePath, 'utf8').then(data => this.#database = JSON.parse(data)).catch(()=> this.#persist())
    }

    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table){
        return this.#database[table] ?? []
    }
    insert(table, data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }else{
            this.#database[table] = [data]
        }

        this.#persist()
        return data
    }
    delete(table, id){
        const data = this.#database[table]
        
        const index = data.findIndex(item => item.id === id)
        if(index > -1){
            data.splice(index, 1)
            this.#persist()
        }
    }
}
```
Nos já tinhamos criado anteriormente o método para deletar um usuário, agora vamos fazer ele funcionar.
1. Primeiro vamos pegar o valor do `:id` que foi passado na url da requisição e será usado como parâmetro para o método `delete`.
2. Depois vamos pegar o valor do `:id` que foi passado na url da requisição e procurar dentro do nosso banco de dados procurando dentro do nosso arquivo _json_ o index desse objeto e validar se ele existe.
3. Depois vamos deletar o usuário que foi encontrado dentro do nosso banco de dados com a função **split**.
* Agora vamos finalizar nossa rota utilizando o método **delete**!
```js
{
    path: buildRoutePath('/users/:id'),
    method: 'DELETE',
    handler: (request, response) => {
        const {id} = request.params;
        db.delete('users', id)
        return response.writeHead(204).end();
    }
}
```
Nesse código acima nós vamos pegar o valor do `:id` que foi passado na url da requisição e vamos passar como parâmetro para o nosso método **delete**. 
* **PRONTO** agora temos nossa rota para deletar um usuário funcionando! e já preparamos o nosso Regex para pegar o valor do `:id` que foi passado na url da requisição, assim poderemos trabalhar mais facilmente com rotas dinâmicas que iremos construir.
* Eu sei que esse código ficou um pouco grande, mas é para vocês terem uma noção de como funciona uma API REST, e como podemos trabalhar com rotas dinâmicas.
### Criando outras rotas dinâmicas
Eu vou deixar um pequeno desafio para vocês, vocês vão criar as rotas para atualizar um usuário e para buscar um usuário pelo seu id. Tentem fazer isso com base no que já foi descrito aqui, caso não consigam, vou escrever a solução aqui em baixo.
* **Solução**
```js
//db.js
update(table, id, {name, age}){
        const data = this.#database[table]
        
        const index = data.findIndex(item => item.id === id)
        if(index > -1){
            if(name){
                data[index].name = name
            }
            if(age){
                data[index].age = age
            }
            this.#persist()
        }
    }
```
```js
{
    path: buildRoutePath('/users/:id'),
    method: 'PUT',
    handler: async (request, response) => {
        await PostUsers(request, response, db)
        const {id} = request.params;
        const {name, age} = request.body;
        db.update('users', id, {name, age})
        return response.writeHead(204).end();
    }
}
```