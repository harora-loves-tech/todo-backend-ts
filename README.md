# 📝 Todo Backend API

A production-ready backend for a Todo application built with **TypeScript**, **Express**, **PostgreSQL**, and **Prisma**. The project includes user authentication using **JWT**, secure password hashing, and user-scoped Todo CRUD APIs.

---

## 🚀 Tech Stack

* **Node.js**
* **TypeScript**
* **Express**
* **PostgreSQL**
* **Prisma ORM (with pg adapter)**
* **JWT (jsonwebtoken)**
* **bcrypt**

---

## 📁 Project Structure

```
.
├── prisma
│   ├── schema.prisma
│   ├── migrations
│   └── client.ts
├── src
│   ├── app.ts
│   ├── controllers
│   ├── routes
│   ├── services
│   ├── middlewares
│   ├── db
│   │   └── prisma.ts
│   └── utils
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/todo-backend.git
cd todo-backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file using the example:

```bash
cp .env.example .env
```

Update values inside `.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/todo
JWT_SECRET=your_secret_key
PORT=4000
```

---

## 🗄️ Database Setup

Run migrations:

```bash
npx prisma migrate dev
```

(Optional) Open Prisma Studio:

```bash
npx prisma studio
```

---

## ▶️ Running the Server

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

---

## 🔐 Authentication APIs

### Register

```
POST /auth/register
```

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

### Login

```
POST /auth/login
```

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "token": "JWT_TOKEN"
}
```

---

## ✅ Todo APIs (Protected)

All Todo routes require:

```
Authorization: Bearer <JWT_TOKEN>
```

### Create Todo

```
POST /todos
```

```json
{ "title": "Learn Prisma" }
```

---

### Get Todos

```
GET /todos
```

---

### Update Todo

```
PUT /todos/:id
```

```json
{ "completed": true }
```

---

### Delete Todo

```
DELETE /todos/:id
```

---

## 🧪 Health Check

```
GET /health/db
```

Checks database connectivity.

---

## 🔒 Security Notes

* Passwords are hashed using **bcrypt**
* JWT is used for stateless authentication
* User data is isolated by `userId`
* `.env` is excluded from version control

---

## 🛣️ Roadmap / Improvements

* Input validation (Zod)
* Refresh tokens
* Pagination for todos
* Unit & integration tests
* Docker support

---


