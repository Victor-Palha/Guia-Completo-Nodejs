# Estudos Node.js Completo

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

### Projeto 01 - Fundamentos Node.js
1. Vamos criar um servidor HTTP com Node.js!;
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
