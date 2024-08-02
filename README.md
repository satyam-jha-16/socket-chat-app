# 🚀 Socket Chat Application

A real-time chat application built with cutting-edge technologies for seamless communication.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## 🌟 Features

- **Real-time messaging** with instant delivery
- Robust **user authentication** system
- **Private and group chats** functionality
- Persistent **message history**
- **Online/offline user status** indicators

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.IO** - Real-time event-based communication
- **TypeScript** - Typed superset of JavaScript
- **Prisma** - Next-generation ORM
- **JSON Web Tokens (JWT)** - Secure authentication

### Frontend
- **React** - UI library
- **TypeScript** - For type-safe code
- **Socket.IO-client** - Real-time client-side events

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or later)
- **npm** or **yarn**
- **PostgreSQL** database

## 🚀 Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/socket-chat-app.git
   cd socket-chat-app
   ```

2. **Install backend dependencies**
   ```sh
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```sh
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the backend directory:
   ```
   DATABASE_URL="your-postgres-database-url"
   JWT_SECRET="your-jwt-secret"
   PORT=5001
   ```

5. **Set up the database**
   ```sh
   npx prisma migrate dev
   ```

## 🏃‍♂️ Running the Application

1. **Start the backend server**
   ```sh
   cd backend
   npm run dev
   ```

2. **Start the frontend application**
   ```sh
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## 🌐 Deployment

### Backend Deployment (Google Cloud Run)

1. **Build the Docker image**
   ```sh
   docker build -t gcr.io/[PROJECT-ID]/socket-chat-backend .
   ```

2. **Push the image to Google Container Registry**
   ```sh
   docker push gcr.io/[PROJECT-ID]/socket-chat-backend
   ```

3. **Deploy to Cloud Run**
   ```sh
   gcloud run deploy --image gcr.io/[PROJECT-ID]/socket-chat-backend --platform managed
   ```

### Frontend Deployment (Vercel)

1. **Install Vercel CLI**
   ```sh
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```sh
   vercel
   ```

## 📚 API Documentation

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login` | POST | User login |
| `/api/auth/signup` | POST | User registration |
| `/api/auth/logout` | POST | User logout |
| `/api/auth/getme` | POST | User logout |
| `/api/messages/getconversations` | GET | Fetch Peoples |
| `/api/messages/:id` | GET | Fetch messages |
| `/api/messages/send/:id` | GET | post message |

For detailed API documentation, refer to the [API.md](./API.md) file.

## 🧪 Testing

Run the test suite with:

```sh
npm test
```

## 🐛 Troubleshooting

**Issue**: CORS errors when running locally
**Solution**: Ensure your backend CORS configuration includes `http://localhost:3000`

For more common issues and solutions, see our [Troubleshooting Guide](./TROUBLESHOOTING.md).

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/yourusername/socket-chat-app/issues). 

## 📝 License

Copyright © 2024 [Your Name](https://github.com/yourusername).

This project is [MIT](https://opensource.org/licenses/MIT) licensed.

## 🙏 Acknowledgements

- [Socket.IO Documentation](https://socket.io/docs/v4)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Prisma Documentation](https://www.prisma.io/docs/)

---

Made with ❤️ by [Satyam Jha](https://github.com/satyam-jha-16)
```
