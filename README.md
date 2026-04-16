# XenonGram-Backend

A RESTful backend API for **XenonGram** — a social media platform built with the MERN stack. Handles authentication, user profiles, media uploads, and social feeds using Node.js, Express, MongoDB, and JWT-based auth.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT (JSON Web Tokens) |
| File Uploads | Multer / Cloudinary (or similar) |
| Environment | dotenv |

---

## 📁 Project Structure

```
XenonGram-Backend/
├── src/
│   ├── controllers/       # Route handler logic
│   ├── db/                # MongoDB connection setup
│   ├── middlewares/       # Auth & request middlewares
│   ├── model/             # Mongoose schemas & models
│   ├── routes/            # Express route definitions
│   └── app.js             # Express app config & middleware setup
├── server.js              # Entry point — starts HTTP server
├── .gitignore
├── package.json
└── package-lock.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/NOBEL118/XenonGram-Backend.git
cd XenonGram-Backend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/xenongram
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
NODE_ENV=development

# Optional: if using Cloudinary for media
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Run the Server

```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

Server will start at `http://localhost:5000`

---

## 🔐 Authentication

JWT tokens are issued on login/signup and must be sent with protected requests via an **HTTP-only cookie** or `Authorization: Bearer <token>` header.

### Auth Flow

```
POST /api/auth/signup  →  Register user  →  Returns JWT
POST /api/auth/login   →  Login user     →  Returns JWT
POST /api/auth/logout  →  Clears cookie
```

---

## 📡 API Endpoints

### Auth

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| POST | `/api/auth/signup` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| POST | `/api/auth/logout` | Logout user | ✅ |

### Users / Profile

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| GET | `/api/users/:id` | Get user profile | ✅ |
| PUT | `/api/users/:id` | Update profile | ✅ |
| POST | `/api/users/:id/follow` | Follow a user | ✅ |
| DELETE | `/api/users/:id/unfollow` | Unfollow a user | ✅ |

### Feed & Posts

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| GET | `/api/feed` | Get home feed | ✅ |
| POST | `/api/posts` | Create a post | ✅ |
| DELETE | `/api/posts/:id` | Delete a post | ✅ |
| PUT | `/api/posts/:id/like` | Like/unlike a post | ✅ |

> **Health Check:** `GET /api/health` — returns server status (no auth required)

---

## 🧱 Database Models

### User
```
_id, username, email, password (hashed), profilePicture, bio, followers[], following[], createdAt
```

### Post
```
_id, userId, description, img, likes[], createdAt
```

---

## 🧩 Middlewares

- **`verifyToken`** — validates JWT from cookie or Authorization header; attaches `req.user`
- Error handler — centralized error response formatting

---

## 🔒 Security Notes

- Passwords are hashed with **bcrypt** before storage
- JWT is stored in an **HTTP-only cookie** to prevent XSS access
- CORS is configured to allow only trusted origins
- Environment secrets are never committed — use `.env` only

---

## 📦 Scripts

```bash
npm start       # Start production server
npm run dev     # Start dev server with hot-reload (nodemon)
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source. See [LICENSE](LICENSE) for details.

---

> Made with ❤️ by [NOBEL118](https://github.com/NOBEL118)
