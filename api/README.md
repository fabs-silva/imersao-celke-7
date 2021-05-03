# SEMANA IMERSÃO CELKE

## SEQUÊNCIA PARA CRIAR O PROJETO

### Criar o arquivo package.json

`npm init`

### 1. Instalar o Express

Gerenciador de requisições, rotas e URLs, entre outras funcionalidades

`npm install express --save`

### 2. Rodar o projeto

`node app.js`

### 3. Acessar o projeto no navegador

`<http://localhost:3000>`

### 4. Instalar a dependência Nodemon

Monitora qualquer mudança no seu código fonte e reinicia automaticamente o servidor

`npm install -g nodemon`

Dependência instalada 'globalmente', não apenas no projeto (-g)

### 5. Rodar o projeto usando o Nodemon

`nodemon app.js`

### 6. Instalar a dependência Sequelize

Biblioteca para facilitar o gerenciamento de um banco de dados relacional (ORM - Object Relational Mapper - Mapeamento de Objeto Relacional)

`npm install --save sequelize`

O comando --save inclui a dependência no arquivo package.json

### 7. Instalar o drive do banco de dados a ser utilizado

`npm install --save mysql2`

### 8. Instalar o My SQL Workbench

### 9. Criar a base de dados

Comando SQL executado no MySQL Workbench

`CREATE DATABASE celke CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`

- **CREATE DATABASE celke** - cria a base de dados com o nome 'celke';
- **CHARACTER SET utf8mb4** - conjunto de caracteres especiais que será utilizado na base de dados;
- **COLLATE utf8mb4_unicode_ci** - como o SQL irá tratar os caracteres inseridos na base de dados;

### 10. Criar o CRUD

- Create (criar) - `app.post`;
- Read (ler) - `app.get`;
- Update (atualizar) - `app.put`;
- Delete (excluir) - `app.delete`

### 11. Instalar a dependência CORS

Permitir acesso a API (middleware)

`npm install --save cors`

## COMO RODAR O PROJETO BAIXADO

### 1. Instalar todas as dependências indicadas pelo package.json

`npm install`
