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