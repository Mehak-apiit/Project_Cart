# ProjectCart — Buy & Sell Projects Marketplace

> A clean, role-based marketplace backend for developers & students.

ProjectCart helps **developers and students** connect in one place to **buy and sell projects**. This backend provides authentication and secure user management using **JWT + MongoDB (Mongoose)** with a simple layered architecture (routes → controllers → repositories → models).

---

## ✨ Features

- **User Authentication**
  - Register with email + password (password is hashed with `bcryptjs`).
  - Login and receive a **JWT token**.
- **Role-Based Access Control**
  - `Admin` role can manage users.
  - `User` role is restricted from admin endpoints.
- **Secure API (JWT Middleware)**
  - Protected routes require `Authorization: Bearer <token>`.
  - Password is excluded from the attached user object (`select("-password")`).
- **Clean Architecture**
  - Routes, controllers, middleware, models, and repositories are separated.

---

## 🧰 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT (jsonwebtoken)**
- **bcryptjs** (password hashing)

---

## 📁 Project Structure

```text
ProjectCart/
  README.md
  backend/
    server.js
    package.json
    src/
      config/
        db.js
      controllers/
        authController.js
        userController.js
      middleware/
        authMiddleware.js
        adminMiddleware.js
      models/
        userModel.js
      repositories/
        userRepository.js
      routes/
        authRoutes.js
        userRoutes.js
      utils/
        generateToken.js
```

---

## 🚀 Getting Started

### 1) Install dependencies

```bash
cd backend
npm install
```

### 2) Configure environment variables

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/projectcart
JWT_SECRET=your_super_secret_jwt_key
```

### 3) Run the server

Development mode:

```bash
cd backend
npm run dev
```

Production mode:

```bash
cd backend
npm start
```

Server will run at:

- `http://localhost:5000` (default)

---

## 🔐 Authentication (JWT)

Most protected endpoints require:

- Header:

```http
Authorization: Bearer <JWT_TOKEN>
```

JWT is generated on successful register/login with `expiresIn: "7d"`.

---

## 🧠 API Overview (Base Routes)

`server.js` mounts:

- `POST /api/auth/*`  → `authRoutes.js`
- `/api/users/*`     → `userRoutes.js`

---

## 📌 Routes & Endpoints (with Sample Data)

### 1) Auth Routes

#### ✅ Register

- **POST** `/api/auth/register`

**Request body**

```json
{
  "firstname": "Ayesha",
  "lastname": "Khan",
  "username": "ayesha_dev",
  "email": "ayesha@example.com",
  "password": "StrongPassword@123"
}
```

**Response (201)**

```json
{
  "message": "User Registered",
  "token": "<JWT_TOKEN>"
}
```

**Errors**

- If email already exists (400):

```json
{ "message": "User already exists" }
```

---

#### ✅ Login

- **POST** `/api/auth/login`

**Request body**

```json
{
  "email": "ayesha@example.com",
  "password": "StrongPassword@123"
}
```

**Response (200)**

```json
{
  "message": "Login Successfull",
  "token": "<JWT_TOKEN>"
}
```

**Errors**

- Invalid email (400):

```json
{ "message": "Invalid Email" }
```

- Invalid password (400):

```json
{ "message": "Invalid Password" }
```

---

### 2) User (Admin) Routes

All routes below are **protected** and require:
- Valid JWT (`protect` middleware)
- `req.user.role === "Admin"` (`adminOnly` middleware)

#### ✅ Get All Users

- **GET** `/api/users/`

**Headers**

```http
Authorization: Bearer <JWT_TOKEN>
```

**Response (200)**

```json
[
  {
    "_id": "665c1234abc...",
    "firstname": "Ayesha",
    "lastname": "Khan",
    "username": "ayesha_dev",
    "email": "ayesha@example.com",
    "role": "User",
    "balance": "0",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
]
```

---

#### ✅ Get User by ID

- **GET** `/api/users/:id`

**Example**

`GET /api/users/665c1234abc...`

**Response (200)**

```json
{
  "_id": "665c1234abc...",
  "firstname": "Ayesha",
  "lastname": "Khan",
  "username": "ayesha_dev",
  "email": "ayesha@example.com",
  "role": "User"
}
```

**Errors**

- User not found (404):

```json
{ "message": "User not found" }
```

---

#### ✅ Update User

- **PUT** `/api/users/:id`

**Request body (example)**

```json
{
  "firstname": "Ayesha",
  "lastname": "Khan",
  "mobile": "+91-9999999999",
  "country_name": "India",
  "city": "Mumbai"
}
```

**Response (200)**

```json
{
  "_id": "665c1234abc...",
  "firstname": "Ayesha",
  "lastname": "Khan",
  "mobile": "+91-9999999999",
  "country_name": "India",
  "city": "Mumbai"
}
```

---

#### ✅ Delete User

- **DELETE** `/api/users/:id`

**Response (200)**

```json
{ "message": "User deleted successfully" }
```

**Errors**

- User not found (404):

```json
{ "message": "User not found" }
```

---

## 🛡️ Middleware Details

### `protect` (JWT Authentication)

File: `backend/src/middleware/authMiddleware.js`

Behavior:
- Checks `req.headers.authorization` starts with `Bearer`.
- Extracts the token and verifies it using `process.env.JWT_SECRET`.
- Loads the user from MongoDB and attaches it to `req.user`.
- Excludes password from the attached user via `select("-password")`.

**Failure responses**

- Missing token:

```json
{ "message": "No token " }
```

- Invalid/expired token:

```json
{ "message": "Not authorized " }
```

---

### `adminOnly` (Role Authorization)

File: `backend/src/middleware/adminMiddleware.js`

Behavior:
- Allows access only when `req.user.role === "Admin"`.

**Failure response (403)**

```json
{ "message": "Access denied ❌ (Admin only)" }
```

---

## 🧱 Controllers, Middleware, Repository & Model

### Controllers

- **`backend/src/controllers/authController.js`**
  - `register(req,res)`
  - `login(req,res)`

- **`backend/src/controllers/userController.js`**
  - `getAllUsers`
  - `getUser`
  - `updateUser`
  - `deleteUser`

### Middleware

- **`backend/src/middleware/authMiddleware.js`**
  - `protect`: JWT verification + loads user.

- **`backend/src/middleware/adminMiddleware.js`**
  - `adminOnly`: only allows `role === "Admin"`.

### Repository

- **`backend/src/repositories/userRepository.js`** provides MongoDB operations:
  - `createUser`
  - `findUserByEmail`
  - `getAllUsers`
  - `getUserById`
  - `getUserByIdAndUpdate`
  - `deleteUser`

### Model: `User`

File: `backend/src/models/userModel.js`

Key fields (with defaults/constraints):

- `firstname` (String, required)
- `lastname` (String, required)
- `username` (String, required, unique)
- `email` (String, required, unique)
- `password` (String, required)
- `role` (String, enum: `Admin` | `User`, default: `User`)
- `mobile`, `dial_code`, `country_code` (optional)
- `balance` (`Decimal128`, default: `0`)
- `country_name`, `state`, `city`, `zip`, `address` (optional)
- `total_review` (Number, default: `0`)
- `avg_rating` (`Decimal128`, default: `0`)
- `total_follower` (Number, default: `0`)
- `total_following` (Number, default: `0`)
- `status` (Number, default: `1`)
- `ev`, `sv`, `kv` (Number, default: `0`)
- `avatar`, `bio` (optional)
- Timestamps enabled via `{ timestamps: true }`

---

## 🧪 Testing With cURL (Quick Samples)

### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstname":"Ayesha",
    "lastname":"Khan",
    "username":"ayesha_dev",
    "email":"ayesha@example.com",
    "password":"StrongPassword@123"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"ayesha@example.com",
    "password":"StrongPassword@123"
  }'
```

### Admin: Get All Users

> Replace `<JWT_TOKEN>` with your token.

```bash
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer <JWT_TOKEN>"
```


