# Estudos Node.js Completo
## Instalando Node.js
### Linux:

Existem várias maneiras de instalar o Node.js no Mac.

Você pode baixar o instalador pelo site [nodejs.org](https://nodejs.org/en/). É recomendado usar a versão `LTS`.

## NVM

Outra alternativa é usar o `nvm`

### Instalando o NVM

Para instalar o nvm use o comando:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
```

 Em seguida você pode verificar se o nvm foi instalado corretamente pelo comando:

```bash
nvm -v
```

Se retornar a versão é porque foi instalado corretamente e você já pode usar o nvm para instalar o Node.js

### Instalando o Node.js

Para instalar a versão LTS do Node você pode usar o comando:

```bash
nvm install --lts
```

Para confirmar a instalação basta rodar:

```bash
node -v
```

Se retornar a versão correta é porque foi instalado corretamente.

Caso retorne outra versão use o comando:
```bash
nvm use --lts
```
### Windows

 1. Pra começar, acesse o link de download:

[Node.js](https://nodejs.org/en/)

1. Selecione a versão LTS, ou seja, a versão estável dele:

<aside>
⚠️ ***Você pode fazer o download da versão LTS, mesmo que o número da versão seja diferente do mostrado na imagem abaixo, conforme a data que você está vendo este tutorial.***

</aside>

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/67c43a87-37db-4b22-88ad-f1084e252d34/Untitled.png)

1. Clique no arquivo que foi baixado. A seguinte tela deverá abrir:

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f641c14d-a0bf-4798-aab9-cfa07a7d33e8/Untitled.png)

1. Aceite os termos:

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a1ece1aa-4f15-4655-aa42-c6df917d963a/Untitled.png)

1. Selecione a pasta onde o arquivo será instalado:

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/528cc3c3-eef8-489e-a1cd-99169daf8d80/Untitled.png)

1. Pode manter essas configurações padrões e só clicar em **Next**:

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/088a47c9-d1c3-41cf-8be5-2c9af963d2c8/Untitled.png)

1. Nessa etapa, basta seguir clicando no botão **Next**:

![be9d5a22-image.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d44d4be0-5cb0-4df9-989c-6f9f007a7916/be9d5a22-image.png)

1. Clique em **Install** para finalizar a instalação:

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a417e651-038a-4695-958a-679ff1a05c48/Untitled.png)

Para conferir se a instalação foi um sucesso, basta abrir o seu terminal e digitar o comando:

```jsx
node -v
```

Que o retorno será a versão que o seu node foi instalada:

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/561e2fb8-6065-4567-a5f3-50cf605ef863/Untitled.png)

E o comando:

```jsx
npm -v
```

Para conferir a versão do npm que foi instalada:

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/aea5fe18-f45e-4bd8-bf01-f69379fd5481/Untitled.png)

Prontinho! Você já tem o Node e o npm instalados na sua máquina!