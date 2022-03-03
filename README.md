# API de Blogs


Projeto desenvolvido durante o módulo de Backend do curso de Desenvolvimento Web
da Trybe.<br />
Trata-se de uma API de posts de um blog, onde é possível criar, visualizar, deletar e atualizar os posts.<br />
Para fazer um post é necessário usuário e login, trabalhando a **relação entre** `user` e `post`. Também é necessário a utilização de categorias para seus posts, assim trabalhando a relação de `posts` para `categorias` e de `categorias` para `posts`.


---


## Tecnologias utilizadas


A API foi desenvolvida em NodeJs com o framework Express, ORM Sequelize, banco de dados MySQL, e as bibliotecas: Joi para as validações e express-rescue para lidar com os erros.


---


## Para rodar a aplicação

1. Clone o repositório

2. Instale as dependências

- `npm install`

3. Crie e conecte-se à um banco de dados

**Renomeie o arquivo `.env.example` para `.env`** com as variáveis de ambiente. Por exemplo:

```sh
HOSTNAME=127.0.0.1
MYSQL_USER=seu-nome
MYSQL_PASSWORD=sua-senha
JWT_SECRET=seu-segredo
```

4. Execute a aplicação

- `npm start`


---


### Tabelas

- **Users**, com a seguinte estrutura::

  ```json
  {
    "id": 1,
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
  ```
- **Categories**, com a seguinte estrutura::

  ```json
  {
    "id": 18,
    "name": "News"
  }
  ```

- **PostsCategories**, com a seguinte estrutura:

  ```json
  {
    "postId": 50,
    "categoryId": 20
  }
  ```

- **BlogPosts**, com a seguinte estrutura::

  ```json
  {
    "id": 21,
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "userId": 14,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.947Z",
  }
  ```
  
---


## Funcionamento:

### 1 - Para adicionar um novo usuário

- Faça uma requisição do tipo POST para o endpoint (`/user`), o corpo da requisição deverá ter o seguinte formato:

  ```json
  {
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
  ```
- O campo `displayName` deverá ser uma string com no mínimo de 8 caracteres;

- O campo `email` será considerado válido se tiver o formato `<prefixo>@<domínio>` e se for único. Ele é obrigatório.

- A senha deverá conter 6 caracteres. Ela é obrigatória.

---

### 2 - Para efetuar o login na aplicação

- Faça uma requisição do tipo POST para o endpoint (`/login`), o corpo da requisição deverá seguir o formato abaixo:

  ```json
  {
    "email": "email@mail.com",
    "password": "123456"
  }
  ```

- Caso esteja tudo certo com o login, a resposta será um token `JWT`, no seguinte formato:

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
  ```

---

### 3 - Para listar todos os usuários cadastrados

- Faça uma requisição do tipo GET para o endpoint (`/user`) com um token de autenticação nos headers, caso contrário, retornará o código de `status 401`.

---

### 4 - Para listar um usuário específico

- Faça uma requisição do tipo GET para o endpoint (`/user/:id`) com o `id` correspondente ao usuário que deseja listar. Também é necessário informar um token de autenticação nos headers, caso contrário, retornará um código de `status 401`.

---

### 5 - Para cadastrar uma categoria

- Faça um requisição do tipo POST para o endpoint (`/categories`). O corpo da requisição deve ter a seguinte estrutura:

 ```json
  {
    "name": "Inovação"
  }
  ```

- A requisição deve ter o token de autenticação nos headers e, caso contrário, retornará o código de `status 401`.

---

### 6 - Para listar todas as categorias cadastradas

- Faça uma requisição do tipo GET para o endpoint (`/categories`) com um token de autenticação nos headers, caso contrário, retornará o código de `status 401`.

---

### 7 - Para adicionar um novo post

- Faça uma requisição do tipo POST para o endpoint (`/post`). O corpo da requisição deve ter a seguinte estrutura:

  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "categoryIds": [1, 2]
  }
  ```

- A requisição deve ter o token de autenticação nos headers e, caso contrário, retornará o código de `status 401`.

---

### 8 - Para listar todos os posts

- Faça uma requisição do tipo GET para o endpoint (`/post`) com um token de autenticação nos headers, caso contrário, retornará o código de `status 401`.

---

### 9 - Para listar um post específico

- Faça uma requisição do tipo GET para o endpoint (`/post/:id`) com o `id` correspondente ao post que deseja listar. Também é necessário informar um token de autenticação nos headers, caso contrário, retornará um código de `status 401`.

---

### 10 - Para atualizar um post

- Faça uma requisição do tipo PUT para o endpoint (`/post/:id`). O endpoint deve receber um **BlogPost** que irá sobrescrever o original com o `id` especificado na URL. Só é permitido para o usuário que criou o **BlogPost**.

- A(s) categoria(s) do post **não** podem ser editadas, somente o `title` e `content`.

- O corpo da requisição deve ter a seguinte estrutura:

  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key"
  }
  ```

- Caso uma pessoa diferente de quem criou faça a requisição, retornará o código `status 401`.

---

### 11 - Para deletar um post

- Faça um requisição do tipo DELETE para o endpoint (`post/:id`) com o `id` correspondente ao post que deseja deletar. Só é permitido para o usuário que criou o **BlogPost**.

- Caso uma pessoa diferente de quem criou faça a requisição, retornará o código `status 401`.

---

### 12 - Para excluir o seu cadastro

- Faça uma requisição do tipo DELETE para o endpoint (`/user/me`) utilizando o token de autenticação nos headers, o usuário correspondente será apagado.

---

### 13 - Para pesquisar posts por um termo específico

- Faça uma requisição do tipo GET para o endpoint (`post/search?q=:searchTerm`) que retornará um array de **BlogPosts** que contenham em seu título, ou conteúdo, o termo pesquisado no `queryParam` da URL. 

--- 
