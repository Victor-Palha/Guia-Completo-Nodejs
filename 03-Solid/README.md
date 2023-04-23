## Começando projeto
Para começar vamos instalar as dependencias do projeto
```bash
npm init -y
npm install typescript @types/node tsx tsup --D
npm install fastify
npx tsc --init
```
Depois de instalar as dependencias vamos criar o nosso servidor em 2 arquivos separados
```bash
touch .npmrc
mkdir src
cd src
touch app.ts
touch server.ts
```
Dentro do arquivo .npmrc vamos adicionar o seguinte código:
```bash
save-exact=true
```
*   **Esse comando faz com que as dependencias sejam salvas na exata versão que estamos construíndo a API**
Dentro de app.ts vamos criar a nossa aplicação
```ts
import fastify from 'fastify'

export const app = fastify()

```
Dentro de server.ts vamos criar o nosso servidor
```ts
import { app } from './app'

app.listen({
    host: '0.0.0.0',
    port: 5000
}).then(()=>{
    console.log('Server is running on port 5000')
})
```
**OBS: O `host` é para que o servidor fique disponivel para todos os ips da rede e não tenha problemas para quando for acessador por outro dispositivo!**
*   Agora vamos configurar nossos scripts do package.json para rodar a aplicação.
```json
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsup src --out-dir build",
    "start": "node build/server.js"
  }
  // DEV para rodar o projeto em modo de desenvolvimento
    // BUILD para compilar o projeto para JS
        // START para rodar o projeto em modo de produção
```
## Variáveis de ambiente
Na raiz do projeto vamos criar um arquivo chamado `.env` e dentro dele vamos colocar o seguinte código:
```env
NODE_ENV=development
PORT=5000
```
E na raiz do projeto vamos criar um arquivo chamado `.env.example` e dentro dele vamos colocar o seguinte código:
```env
NODE_ENV=
PORT=
```
Agora vamos instalar as dependencias para trabalhar com variáveis de ambiente:
```bash
npm install dotenv
npm install zod
```
Agora vamos configurar e validar nossas variáveis de ambiente (Siga as instruções abaixo a partir da raiz do projeto):
```bash
cd src
mdkir env
cd env
touch index.ts
```
Dentro de `index.ts` vamos colocar o seguinte código:
```ts
// dependencias
import 'dotenv/config'
import {z} from 'zod'

// validação das variáveis de ambiente
const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(3000)
})

// Transformando as variáveis de ambiente
const _env = envSchema.safeParse(process.env)

// Verificando se as variáveis de ambiente são válidas
if(_env.success === false){
    console.log('Invalid Environment variables '+_env.error.format())
    throw new Error('Invalid Environment variables')
}

// Exportando as variáveis de ambiente
export const env = _env.data
```
## EsLint
Para instalar o eslint vamos rodar o seguinte comando:
```bash
npm install eslint -D
npx eslint --init
```
*   **OBS: O `npx eslint --init` é para configurar o eslint, ele vai lhe fazer uma serie de perguntas para você configurar**
Depois de configurar o eslint ele vai gerar um arquivo chamado `.eslintrc.json` na raiz do projeto, vamos criar um outro arquivo para configurar o eslint, chamado de `.eslintignore` e dentro dele vamos colocar o seguinte código:
```json
node_modules
build
```
Agora vamos no `package.json` e vamos adicionar o seguinte código nos scripts:
```json
    "lint": "eslint src/** --ext .ts --fix",
```
Agora podemos corrigir os erros do eslint rodando o seguinte comando:
```bash
npm run lint
```
## Alias
Vamos configurar os alias para facilitar a importação de arquivos, para isso vamos mudar uma configuração simples no `tsconfig.json`:
```json
    "baseUrl": "./",
    "paths": {
      "@/*": ["./src/*"]
    }, 
```
Dessa forma quando formos importar um arquivo vamos usar o alias `@` e não mais o caminho relativo.
## Prisma.io Fundamentos
O prisma é um ORM que facilita a conexão com o banco de dados e abstrai bastante coisas o que facilita imensamente nosso trabalho com databases, vamos instalar as dependencias:
```bash
npm install prisma -D
npx prisma init
```
O comando `npx prisma init` vai criar um arquivo chamado `schema.prisma` na raiz do projeto, Esse arquivo é que faz a conexão com o banco de dados, então vamos entender melhor como funciona!
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
1. Em `generator client` é onde vamos configurar o prisma para gerar o nosso cliente, que é o que vai nos ajudar a fazer as operações no banco de dados.
2. Em `datasource db` é onde vamos configurar a conexão com o banco de dados, nesse caso estamos usando o postgresql, mas o prisma suporta outros bancos de dados como o mysql, sqlite e mongodb.
3. Em `url = env("DATABASE_URL")` é onde vamos colocar a url de conexão com o banco de dados, nesse caso estamos usando o `env` para pegar a variável de ambiente `DATABASE_URL` que vamos criar mais tarde.
### Model Prisma
Com o arquivo gerado no comando acima, podemos estruturar nosso banco de dados de maneira extremamente simples, vamos criar uma tabela chamada `users`:
```prisma
model User {
  id String @id @default(uuid())
  name String
  email String @unique
  password String

  @@map("users")
}
```
*   A sintaxe para criar uma nova tabela começa com a palavra `model` seguida do **nome da tabela**;
    * Nesse caso **User**.
*   Depois abrimos chaves `{}` e dentro delas vamos colocar os campos da tabela, cada campo é separado por uma quebra de linha.
*   Dentro das chaves colocamos o **nome do campo** seguido de um espaço e o **tipo do campo**.
    * Nesse caso **id** é do tipo **String**.
*   Depois do tipo do campo podemos colocar algumas configurações, como por exemplo:
    * `@id` para definir que o campo é a chave primária da tabela.
    * `@default(uuid())` para definir um valor padrão para o campo, nesse caso estamos usando a função `uuid()` para gerar um id único.
    * `@unique` para definir que o campo é único.
*   Por fim podemos colocar algumas configurações para a tabela, como por exemplo:
    * `@@map("users")` para definir o nome da tabela no banco de dados, nesse caso estamos definindo como `users`.
* Agora rodamos o comando para gerar a tipagem do prisma com base na nossas tabelas.
```bash
npx prisma generate
```
Agora para podemos acessar as tabelas, precisamos instalar uma nova dependencia:
```bash
npm install @prisma/client
```