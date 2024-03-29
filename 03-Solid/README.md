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
### Criando relacionamentos com o Prisma
Para criar relacionamentos no prisma, primeiramente você precisa estar familiarizado com os tipos de relacionamentos que existem, que são:
*   **One to One**
*   **One to Many**
*   **Many to Many**
#### One to One
Um exemplo de relacionamento One to One é o relacionamento entre um usuário e um perfil, onde um usuário só pode ter um perfil e um perfil só pode pertencer a um usuário, para criar esse relacionamento no prisma vamos fazer o seguinte:
```prisma
model User {
  id String @id @default(uuid())
  name String
  email String @unique
  password String
  profile Profile?

  @@map("users")
}

model Profile {
  id String @id @default(uuid())
  bio String?
  user User @relation(fields: [user_id], references: [id])

  user_id String

  @@map("profiles")
}
```
*   No model `User` vamos adicionar um campo chamado `profile` do tipo `Profile?`, que é um relacionamento One to One.
*   No model `Profile` vamos adicionar um campo chamado `user` do tipo `User`, que é um relacionamento One to One.
*   No model `Profile` vamos adicionar um campo chamado `userId` do tipo `String`, que é um relacionamento One to One.
#### One to Many
Um exemplo de relacionamento One to Many é o relacionamento entre um usuário e suas postagens, onde um usuário pode ter várias postagens, mas uma postagem só pode pertencer a um usuário, para criar esse relacionamento no prisma vamos fazer o seguinte:
```prisma
model User {
  id String @id @default(uuid())
  name String
  email String @unique
  password String
  posts Post[]

  @@map("users")
}

model Post {
  id String @id @default(uuid())
  title String
  content String
  users User @relation(fields: [user_id], references: [id])

  user_id String

  @@map("posts")
}
```
*   No model `User` vamos adicionar um campo chamado `posts` do tipo `Post[]`, que é um relacionamento One to Many.
*   No model `Post` vamos adicionar um campo chamado `user` do tipo `User`, que é um relacionamento One to Many.
*   No model `Post` vamos adicionar um campo chamado `userId` do tipo `String`, que é um relacionamento One to Many.
#### Many to Many
Um exemplo de relacionamento Many to Many é o relacionamento entre um usuário e suas postagens favoritas, onde um usuário pode ter várias postagens favoritas e uma postagem pode ser favorita de vários usuários, para criar esse relacionamento no prisma vamos fazer o seguinte:
```prisma
model User {
  id String @id @default(uuid())
  name String
  email String @unique
  password String
  posts Post[]

  @@map("users")
}

model Post {
  id String @id @default(uuid())
  title String
  content String
  users User[]

  @@map("posts")
}

model UserFavoritePost {
  user_id String
  post_id String

  @@id([userId, postId])
  @@map("users_favorite_posts")
}
```
*   No model `User` vamos adicionar um campo chamado `posts` do tipo `Post[]`, que é um relacionamento Many to Many.
*   No model `Post` vamos adicionar um campo chamado `users` do tipo `User[]`, que é um relacionamento Many to Many.
*   No model `UserFavoritePost` vamos adicionar um campo chamado `userId` do tipo `String`, que é um relacionamento Many to Many.
*   No model `UserFavoritePost` vamos adicionar um campo chamado `postId` do tipo `String`, que é um relacionamento Many to Many.
*   No model `UserFavoritePost` vamos adicionar um campo chamado `@@id` que é uma chave composta, ou seja, uma chave que é composta por mais de um campo.

### Comandos fundamentais do Prisma
*   `npx prisma generate` para gerar a tipagem do prisma com base na nossas tabelas.
*   `npx prisma migrate dev` para criar as tabelas no banco de dados.
*   `npx prisma studio` para abrir o prisma studio, que é uma interface gráfica para visualizar as tabelas do banco de dados.
*   `npx prisma migrate reset` para resetar as tabelas do banco de dados.
*   `npx prisma migrate deploy` para criar as tabelas no banco de dados.
## Docker Fundamentos
O que é o Docker?
*   É uma plataforma de código aberto que permite a criação, o teste e a implantação de aplicativos em contêineres de software.
*   Os contêineres permitem que você isole seu aplicativo do ambiente de execução e do sistema operacional subjacente.
*   Os contêineres são semelhantes a máquinas virtuais, mas ao invés de virtualizar o hardware, eles virtualizam o sistema operacional.
*   Isso permite que você execute vários contêineres isolados em um único host, economizando recursos do sistema operacional.
*   Os contêineres são mais leves e mais portáteis do que as máquinas virtuais.
*   Eles compartilham o mesmo kernel do host, o que os torna mais rápidos para iniciar e executar.
*   Eles também compartilham bibliotecas e ferramentas do host, o que os torna mais eficientes em usar recursos do sistema operacional.
*   Os contêineres são executados em um ambiente de tempo de execução que é isolado do host, mas que é compartilhado entre os contêineres.
*   Isso significa que você pode executar vários contêineres em um host e que eles podem se comunicar entre si através de canais bem definidos.
*   Os contêineres são executados como processos isolados no host.
### Instalação
Para instalar o docker no linux, basta seguir esses passos:
```bash
    sudo apt-get update

    sudo apt-get install \
        ca-certificates \
        curl \
        gnupg
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
    echo \
    "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
    "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
        sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```
```bash
    sudo apt-get update
    docker -v
```
Agora vamos achar uma imagem para rodar o docker, vamos usar o postgresql:
*   **Para visualizar as imagens disponíveis:**
    * [Hub Docker](https://hub.docker.com/)
```bash
docker run --name api-solid-pg -e POSTGRES_USERNAME=docker -e POSTGRES_PASSWORD=docker -e POSTGRES_DATABASE=apisolid -p 5432:5432 bitnami/postgresql:latest
```
Vamos por partes:
    1. `docker run` é o comando para rodar uma imagem.
    2. `--name api-solid-pg` é o nome que vamos dar para o container.
    3. `-e POSTGRES_USERNAME=docker` é a variável de ambiente que vamos passar para o container.
    4. `-p 5432:5432` é a porta que vamos usar para acessar o container, ele direciona a porta _5432_ do container para a porta _5432_ do host.
    5. `bitnami/postgresql:latest` é a imagem que vamos usar. (Você pode procurar outras imagens no link acima)
A imagem que criamos fica salva em cache, então podemos parar e iniciar o container quando quisermos:
```bash
docker ps                   //Lista os containers em execução
docker ps -a                //Lista todos os containers
docker start nome ou id     //Inicia o container
docker stop nome ou id      //Para o container
docker rm nome ou id        //Remove o container
```
Agora que temos nosso container rodando, vamos acessar o banco de dados com o Prisma
### Docker com Prisma.io
Quando iniciamos o prisma com o comando `npx prisma init`, ele gerou no nosso arquivo **.env** uma variável de ambiente chamada `DATABASE_URL`, nesse caso ela está apontando para o banco de dados local, mas agora que temos o docker rodando, vamos apontar para o banco de dados do docker.
```env
DATABASE_URL="postgresql://docker:docker@localhost:5432/apisolid?schema=public"
```
Agora podemos rodar o comando `npx prisma migrate dev` para criar as tabelas no banco de dados e ao mesmo tempo testar se o container Docker está funcionando como deveria!
*   Podemos utilizar o próprio Prisma para vizualizar os dados do banco de dados.
    * `npx prisma studio`

## Docker Compose
O que é o Docker Compose?
*   É uma ferramenta para definir e executar aplicativos Docker com vários contêineres.
*   Com o Compose, usamos um arquivo YAML para configurar os serviços de nossos aplicativos.
*   Então, com um único comando, podemos criar e iniciar todos os serviços de nosso aplicativo a partir de nossa configuração.
### Como criar um arquivo docker-compose.yml
Primeiro vamos ir na raiz do nosso projeto e criar um arquivo chamado **docker-compose.yml**.
```yaml
version: '3' #versão da sintaxe do docker-compose

services:                                   #serviços que vamos usar
    api-solid-pg:                           #nome do serviço
        image: bitnami/postgresql:latest    #imagem que vamos usar
        ports:                              #portas que vamos usar
            - 5432:5432
        environment:                        #variáveis de ambiente
            - POSTGRES_USERNAME=docker
            - POSTGRES_PASSWORD=docker
            - POSTGRES_DATABASE=apisolid
```
*   O arquivo docker-compose.yml é um arquivo YAML que define como os contêineres devem ser construídos e executados.
*   O arquivo docker-compose.yml é usado com o comando `docker compose up` ou `docker-compose up -d`.
    *   A diferencia entre os dois comandos é que o primeiro mostra os logs do container e o segundo não.
*   Para parar os containers, basta usar o comando `docker compose stop`.
*   Para remover os containers, basta usar o comando `docker compose down`.
## SOLID 
### O que é SOLID?
*   É um acrônimo para os cinco primeiros princípios da programação orientada a objetos e design de código identificados por Robert C. Martin (Uncle Bob) por volta do ano 2000.
*   O acrônimo SOLID foi introduzido por Michael Feathers, após observar que os cinco princípios poderiam se encaixar nesta palavra.
*   O SOLID é um conjunto de regras que nos ajudam a escrever código mais limpo, mais legível e mais fácil de manter.
#### D - Dependency Inversion Principle (Princípio da inversão de dependência)
*   O princípio da inversão de dependência (DIP) é um dos cinco princípios de design de código SOLID.
*   O DIP afirma que os módulos de alto nível não devem depender de módulos de baixo nível; ambos devem depender de abstrações.
*   Além disso, as abstrações não devem depender de detalhes; os detalhes devem depender de abstrações.
*   Em outras palavras, as dependências de alto nível não devem depender de detalhes de baixo nível; os detalhes devem depender de abstrações de alto nível.
*   O DIP é um princípio muito importante, pois reduz o acoplamento entre módulos de software.
*   O acoplamento é uma medida da dependência entre dois módulos de software; quanto maior o acoplamento, mais dependente um módulo é de outro.

## Factory Pattern
### O que é Factory Pattern?
*   O Factory Pattern é um dos padrões de design mais usados principalmente ​​em Java.
*   Este tipo de padrão de design vem sob o padrão de criação, pois esse padrão fornece uma das melhores maneiras de criar um objeto.
*   No Factory Pattern, criamos o objeto sem expor a lógica de criação ao cliente e nos referimos ao objeto recém-criado usando uma interface comum.
*   O Factory Pattern é usado quando temos uma superclasse com várias subclasses e, com base na entrada, queremos retornar uma das subclasses.
*   Este padrão assume uma superclasse como classe de fábrica e, em seguida, cria o objeto de subclasse.
### Resumo
Criaremos uma função que vai receber um parâmetro e vai retornar uma classe, essa classe vai ser a classe que vamos usar para criar o objeto. Assim quando precisamos de um objeto, basta chamar a função passando o parâmetro que ela vai retornar o objeto que precisamos. Isso faz com que economizemos linhas de código e deixe o código mais limpo e legível.

## TDD (Test Driven Development)
### O que é TDD?
*   O TDD é uma abordagem de desenvolvimento de software em que os testes são escritos antes de escrever o código.
### Red
*   O Red é a primeira etapa do TDD, nessa etapa escrevemos o teste que vai falhar.
### Green
*   O Green é a segunda etapa do TDD, nessa etapa escrevemos o código que vai fazer o teste passar.
### Refactor
*   O Refactor é a terceira etapa do TDD, nessa etapa refatoramos o código para que ele fique mais limpo e legível.
#### Dica Vitest
Para trabalhar com comparação de datas podemos utilizar Mocking do vitest.
```ts
import { InMemoryCheckIn } from "@/repositories/in-memory/in-memory-check-in-repository"
import { beforeEach, describe, expect, it, afterEach, vi } from "vitest"
import { CheckInService } from "./checkInService"
import { randomUUID } from "node:crypto"

let inMemory: InMemoryCheckIn
let sut: CheckInService

describe("Auth service", () => {

    beforeEach(()=> {
        inMemory = new InMemoryCheckIn()
        sut = new CheckInService(inMemory)
        //set timer
        vi.useFakeTimers()
    })

    afterEach(()=>{
        //clear timer
        vi.clearAllTimers()
    })
    

    it("Should not be able to create 2 check-in on same day", async () => {

        vi.setSystemTime(new Date(2023, 7, 28, 10, 0, 0))
        const checkInData = {
            gym_id: randomUUID(),
            user_id: randomUUID(),
            validated_at: new Date()
        }

        const {checkIn} = await sut.execute(checkInData)
        console.log(checkIn.created_at)
        await expect(()=>
            sut.execute(checkInData)
        ).rejects.toBeInstanceOf(Error)
    })

})
```

## Autenticação
### JWT (JSON Web Token)
Para utilizar o JWT na nossa aplicação que utiliza o Fastify, vamos instalar a biblioteca:
```bash
npm install @fastify/jwt
```
Agora no arquivo principal da nossa aplicação, vamos importar a biblioteca e registrar ela no nosso servidor:
```ts
app.register(fastifyJwt, {
    secret: env.JWT_SECRET // O segredo está no .env do projeto
})
```
No Fastify, podemos validar o token utilizando a função `jwtVerify`
```ts
await req.jwtVerify() //Fastify Rquest -> Token on header
```
## Teste e2e
### Criando environment para teste
```bash
mkdir vistest-enviroment-prisma
cd vistest-enviroment-prisma
npm init -y
touch prisma-test-environment.ts
```
*   **Package.json**
```json
{
  "name": "vitest-environment-prisma",
  "version": "1.0.0",
  "description": "",
  "main": "prisma-test-environment.ts",
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
*   **prisma-test-environment.ts**
```ts
import {Environment} from "vitest"

export default <Environment>{
    name: "prisma",
    async setup() {
        // setup environment
        console.log("Start")

        return {
            async teardown(){
                // teardown environment
                console.log("Finish")
            }
        }
    },
}
```
*  **vite.config.ts**
```ts
import { defineConfig } from "vitest/config"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        environmentMatchGlobs: [["src/http/controllers/**", "prisma"]] // vitest-environment <prisma> <= esse nome é o segundo parametro
    }
})
```
*   **npm link**
```bash
cd prisma/vistest-enviroment-prisma
npm link # tem que ter o package.json
cd ../..
npm link vistest-enviroment-prisma

npm run test
```

## CI (Continuous Integration)
### O que é CI?
*   O CI é uma prática de desenvolvimento de software em que os desenvolvedores integram o código em um repositório compartilhado várias vezes ao dia.
*   Cada integração de código é verificada por uma compilação automatizada, permitindo que as equipes detectem problemas cedo.
*   Ao integrar regularmente, você pode detectar erros rapidamente e localizá-los com mais facilidade.
*   Além disso, a automação de compilações e testes aumenta a confiança na versão do software.
### Github Actions
*   O Github Actions é uma ferramenta de CI/CD que permite automatizar tarefas dentro do Github.
*   Com o Github Actions podemos criar workflows que vão ser executados quando alguma ação for disparada.
*   Podemos criar workflows para rodar testes, fazer deploy, entre outras coisas.
#### Criando workflow
*   Para criar um workflow, basta criar um arquivo na pasta `.github/workflows` com o nome que você quiser.
*   No arquivo, vamos definir o nome do workflow, quando ele vai ser executado e o que ele vai fazer.
*   exemplo de workflow:
```yml
name: Run Unit Tests

on: [push]

jobs:
  run-unit-tests:
    name: Run Unit Tests
    runs-on: ubuntu-latest

    steps:
      - uses: actions/chackout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      
      - run: npm ci

      - run: npm run test
```