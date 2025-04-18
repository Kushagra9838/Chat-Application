# 📱 Chat Application Backend (NestJS)

This is the backend service for a chat application built with **NestJS**, supporting user registration/login, messaging, contact management, and notifications.

---

## 🚀 Features

- 🧑 User registration and login with JWT authentication
- 👥 Contact request system (send/accept requests)
- 💬 Messaging system with pagination and rate limiting
- 🔔 Notification system
- 📄 Swagger API documentation
- 🧾 Winston-based logging to console and file

---

## 🧰 Tech Stack

- **Framework**: NestJS
- **Database**: MongoDB (via Mongoose)
- **Auth**: JWT
- **Logger**: Winston
- **Docs**: Swagger

---

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Kushagra9838/Chat-Application.git
cd Chat-Application
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup MongoDB
Ensure the following services are running:
- MongoDB (default: `mongodb://localhost:27017/chatApplication`)

### 4. Environment Configuration
Create a `.env` file in the root folder with the following content:

```env
# App
PORT=3000

# Auth
JWT_SECRET=your_jwt_secret

# Nodemailer
EMAIL=your_email@example.com
NODEMAILER_PASSWORD=your_app_password

# MongoDB
MONGO_URI=mongodb://localhost:27017/chatApplication
```

> ⚠️ Do NOT commit your `.env` file to version control. Add it to `.gitignore`.

### 5. Run the Application
```bash
npm run start:dev
```

Swagger docs available at: `http://localhost:3000/api`

---

## 📂 Project Structure

```
src/
├── auth/
├── contacts/
├── messages/
├── notification/
├── logger/
├── main.ts
├── app.module.ts
```

---
