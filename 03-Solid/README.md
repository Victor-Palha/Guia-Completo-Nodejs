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
mkdir src
cd src
touch app.ts
touch server.ts
```
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
