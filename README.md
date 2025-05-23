**Full-Stack Task Management System** built with MERN + Tailwind CSS :

---

# ✅ Task Management System

A full-stack task management web application using **MongoDB, Express.js, React, Node.js (MERN)** with **Tailwind CSS** for UI, **JWT** for authentication, **Multer** for file uploads. Supports role-based access control and task assignment with PDF attachments.

---

## 🔧 Features

* 🔐 User registration and login (JWT-based)
* 🧑‍💼 Role-based access: `admin`, `user`
* ✅ CRUD operations for Users and Tasks
* 📄 Upload up to 3 PDFs per task
* 📂 View/download task documents
* 🔄 Filter, sort, and paginate tasks
* 🔄 Assign tasks to users (Admin only)
* 📑 API documented with Postman or Swagger

---

## 🚀 Tech Stack

| Layer       | Tech                                        |
| ----------- | ------------------------------------------- |
| Frontend    | React, Tailwind CSS, React Router, Axios    |
| State Mgmt  | Context API                                 |
| Backend     | Node.js, Express.js, Multer, JWT, Bcrypt    |
| Database    | MongoDB (via Docker container)              |
| File Upload | Multer (stored on local filesystem)         |
| Auth        | JWT, Role-based Authorization                  

---

## 📁 Folder Structure

```
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.jsx
│   └── tailwind.config.js
├── server/                 # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   └── app.js
├── docker-compose.yml
├── Dockerfile (for frontend & backend)
└── README.md
```

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-managemer
```

### 2. Environment Variables

Create `.env` files in `server/`:

```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/taskdb
JWT_SECRET=your_jwt_secret
```

### 3. Run with Docker



* React app → [http://localhost:3000](http://localhost:3000)
* Express API → [http://localhost:5000/api](http://localhost:5000/api)

---


## 🔐 Roles & Permissions

| Action              | User | Admin |
| ------------------- | ---- | ----- |
| Register/Login      | ✅    | ✅     |
| View Own Tasks      | ✅    | ✅     |
| Assign Tasks        | ❌    | ✅     |
| Create/Update Tasks | ❌    | ✅     |
| Manage Users        | ❌    | ✅     |

---

## 🧪 Testing

```bash
# Backend tests
cd server
npm run test
```

Ensure >80% code coverage is maintained.

---

## 📌 Roadmap

* [x] Auth (JWT)
* [x] CRUD Users/Tasks
* [x] File uploads (PDF)

---

## 👨‍💻 Author

* **Neeraj Gupta**
* GitHub: [@NexusNeeraj](https://github.com/NexusNeeraj)

---

