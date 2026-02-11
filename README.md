# 📝 Todo API Backend

A production‑grade **Todo application backend** built with **TypeScript**, **Express**, **PostgreSQL**, and **Prisma**.
This project follows clean architecture principles with strict typing, centralized error handling, and scalable patterns.

---

## 🚀 Tech Stack

* **TypeScript** (strict mode enabled)
* **Node.js + Express**
* **PostgreSQL**
* **Prisma ORM (v7)** with PG adapter
* **JWT Authentication** (`jsonwebtoken`)
* **Zod** for request validation
* **bcrypt** for password hashing

---

## 📁 Project Structure

```
root
├── prisma
│   ├── schema.prisma
│   └── migrations
│
├── src
│   ├── app.ts
│   ├── controllers
│   ├── routes
│   ├── services
│   ├── middlewares
│   ├── validators
│   └── utils
│
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🧠 Architecture Principles

* **Thin controllers** – no business logic
* **Services own domain rules**
* **Centralized error handling** using `AppError`
* **No try/catch noise** in controllers (`asyncHandler`)
* **Strict typing** (`exactOptionalPropertyTypes: true`)
* **Validation first** using Zod

---

## 🔐 Authentication

### Register

```
POST /auth/register
```

**Body**

```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

---

### Login

```
POST /auth/login
```

**Response**

```json
{
  "token": "<jwt-token>"
}
```

---

## ✅ Todo APIs (Authenticated)

All todo routes require a valid JWT token.

### Create Todo

```
POST /todos
```

```json
{
  "title": "Finish backend"
}
```

---

### Get Todos (Pagination + Filtering)

```
GET /todos?page=1&limit=10&completed=false&search=backend
```

**Response**

```json
{
  "items": [...],
  "meta": {
    "total": 42,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

---

### Update Todo

```
PATCH /todos/:id
```

```json
{
  "completed": true
}
```

---

### Delete Todo

```
DELETE /todos/:id
```

---

## 🧪 Validation & Error Handling

* **Zod** validates all request bodies and query params
* **AppError** is used for all domain‑level failures
* Global error middleware ensures consistent responses

```json
{
  "message": "Todo not found"
}
```

---

## 🩺 Health Check

```
GET /health/db
```

Checks database connectivity.

---

## ⚙️ Setup Instructions

### 1️⃣ Install dependencies

```bash
npm install
```

---

### 2️⃣ Configure environment variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/todo_db
JWT_SECRET=supersecret
PORT=4000
```

---

### 3️⃣ Run migrations

```bash
npx prisma migrate dev
```

---

### 4️⃣ Start the server

```bash
npm run dev
```

---

## 🧭 Future Improvements

* Cursor‑based pagination
* Role‑based access control
* Refresh tokens
* OpenAPI / Swagger docs
* Integration tests

---

## 📜 License

MIT License

---

Built with care and strong typing ❤️
