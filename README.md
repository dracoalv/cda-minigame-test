# CDA Minigame Test

Este é um projeto de um minigame criado usando React, TypeScript e Vite. O objetivo é demonstrar habilidades em desenvolvimento front-end e testar a lógica do jogo com testes unitários utilizando Vitest.

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Executando o Ambiente de Desenvolvimento](#executando-o-ambiente-de-desenvolvimento)
- [Construindo para Produção](#construindo-para-produção)
- [Testes](#testes)
- [Deploy](#deploy)
- [Contato](#contato)

## Visão Geral

Este projeto é uma aplicação de minigame simples onde os jogadores devem seguir uma sequência de teclas. A aplicação usa `howler` para tocar sons durante o jogo, fornecendo feedback ao usuário.

## Funcionalidades

- Sequências dinâmicas de teclas.
- Feedback sonoro para interações do usuário.
- Contador de sequência mostrando progresso atual.
- Testes unitários para garantir a qualidade do código.

## Pré-requisitos

Antes de começar, certifique-se de ter o Node.js instalado na sua máquina. Você pode baixar o Node.js [aqui](https://nodejs.org/).

## Instalação

1. Clone o repositório:
  ```sh
    git clone https://github.com/seu-usuario/cda-minigame-test.git
    cd cda-minigame-test
  ```

2. Instale as dependências:
  ```sh
    npm install
  ```

## Scripts Disponíveis
No diretório do projeto, você pode executar:

- npm run dev: Executa a aplicação em modo de desenvolvimento.
Acesse http://localhost:5173 para ver no navegador.

- npm run build: Cria a versão de produção do aplicativo na pasta dist.

- npm run lint: Verifica e corrige problemas de lint no código.

- npm run preview: Visualiza a versão de produção do aplicativo localmente.

- npm run test: Executa os testes unitários.

## Executando o Ambiente de Desenvolvimento
Para iniciar o ambiente de desenvolvimento, execute:

```sh
npm run dev
```
A aplicação estará disponível em http://localhost:5173.

## Construindo para Produção
Para construir o projeto para produção, execute:

```sh
npm run build
```
Os arquivos de saída estarão na pasta dist. Você pode servir esses arquivos com qualquer servidor estático.

## Testes
Para executar os testes, utilize:

```sh
npm run test
```

## Deploy
Este projeto está configurado para ser facilmente implantado no Vercel. Siga os passos abaixo para fazer o deploy:

Crie uma conta no Vercel.
Instale o Vercel CLI:
```sh
npm i -g vercel
```

Execute o comando para inicializar o projeto Vercel:
```sh
vercel
```

Siga as instruções interativas para configurar o projeto. O Vercel detectará automaticamente que você está usando Vite e configurará o build e as rotas corretamente.

## Contato
Para quaisquer dúvidas ou sugestões, entre em contato pelo dracoalv1@gmail.com.
#

Espero que este README seja útil para entender o projeto e configurar o ambiente de desenvolvimento. Se precisar de mais ajuda, sinta-se à vontade para perguntar!
