<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<h1 align="center">API - Gestão de Usuários e Pedidos</h1>

<p align="center">
  API REST construída com NestJS para gerenciamento de usuários e pedidos com autenticação JWT.
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/@nestjs/core.svg" />
  <img src="https://img.shields.io/npm/l/@nestjs/core.svg" />
  <img src="https://img.shields.io/npm/dm/@nestjs/common.svg" />
</p>

---

# 🧠 Visão Geral

Sistema backend que permite:

* Cadastro de usuários
* Login com autenticação JWT
* CRUD de usuários
* CRUD de pedidos
* Relacionamento entre usuários e pedidos
* Proteção de rotas

---

# 🛠️ Tecnologias

* NestJS
* Prisma ORM
* PostgreSQL
* JWT
* Bcrypt
* Jest

---

# ⚙️ Setup

## 📥 Instalação

```bash
npm install
```

---

## 🔐 Variáveis de ambiente

Crie `.env`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/seubanco"
JWT_SECRET="sua_chave"
```

---

## 🗄️ Banco de dados

```bash
npx prisma migrate dev
npx prisma generate
```

---

## ▶️ Rodar aplicação

```bash
npm run start:dev
```

📍 URL:

```
http://localhost:3000
```

---

# 🔐 Autenticação

Fluxo:

1. Criar usuário
2. Fazer login
3. Receber token
4. Usar token nas rotas protegidas

Header:

```http
Authorization: Bearer TOKEN
```

---

# 📌 Endpoints

## 👤 Usuários

### Criar

POST `/users`

### Listar (🔒)

GET `/users`

### Buscar por ID (🔒)

GET `/users/:id`

### Atualizar (🔒)

PATCH `/users/:id`

### Deletar (🔒)

DELETE `/users/:id`

---

## 🔐 Auth

### Login

POST `/auth/login`

```json
{
  "email": "user@email.com",
  "senha": "123456"
}
```

---

## 📦 Pedidos

### Criar (🔒)

POST `/order`

```json
{
  "descricao": "Produto",
  "userId": 1
}
```

---

### Listar (🔒)

GET `/order`

---

### Por usuário (🔒)

GET `/order/user/:id`

---

### Atualizar (🔒)

PATCH `/order/:id`

---

### Deletar (🔒)

DELETE `/order/:id`

---

# 🧪 Testes

```bash
npm run test
npm run test:e2e
npm run test:cov
```

---

# 📂 Estrutura

```
src/
 ├── auth/
 ├── users/
 ├── order/
 ├── prisma/
 └── app.module.ts

test/
 ├── auth.e2e-spec.ts
 ├── users.e2e-spec.ts
 ├── orders.e2e-spec.ts
```

---

# ⚠️ Regras de Negócio

* CPF e Email são únicos
* Senhas são criptografadas
* Usuário usa soft delete
* Rotas protegidas exigem JWT