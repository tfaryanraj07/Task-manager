# 🚀 Task Management System (MERN Stack)

A full-stack Task Management System built using:

- MongoDB
- Express.js
- React.js (Vite)
- Node.js
- JWT Authentication
- Role-Based Access Control

---

## 🔐 Features

### 👨‍💼 Admin
- Create Tasks
- Edit Tasks
- Delete Tasks
- Assign Tasks to Employees
- View All Tasks
- View Dashboard Statistics
- View Total Users

### 👨‍💻 Employee
- Register Account
- Login
- View Assigned Tasks
- Update Task Status (Pending / In Progress / Completed)
- View Personal Dashboard Stats

---

## 🗄 Database Structure

### Users Collection
- name
- email
- password (hashed)
- role (admin / employee)

### Tasks Collection
- title
- description
- priority (Low / Medium / High)
- deadline
- status
- assignedTo (User reference)
- createdBy (User reference)

---

## 🛠 Tech Stack

Frontend:
- React (Vite)
- Axios
- React Router DOM

Backend:
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs

---

## ⚙️ Installation (Local Setup)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/task-manager.git
cd task-manager