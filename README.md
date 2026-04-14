# Task Management System (Full-Stack | JWT Auth | Role-Based Access)

## Overview
A full-stack Task Management system with secure authentication and role-based access control. Users can register, log in, and manage tasks through a protected dashboard.

Designed with a clean, modular backend architecture and scalable structure.

---

## Features

### 🔐 Authentication & Authorization
- User registration & login
- Password hashing using bcrypt
- JWT-based authentication
- Role-based access (admin/user)

### 📌 Task Management (CRUD)
- Create tasks
- View tasks
- Update tasks 
- Delete tasks

### 🛡️ Security & Validation
- Protected API routes
- Input validation
- Error handling with proper HTTP status codes

### 🌐 Frontend
- React-based minimal UI
- Login & registration forms
- Task dashboard
- API integration with backend

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt

### Frontend
- React.js (Vite)
- Axios

---

## Project Structure

assigment/
│
├── backend/
├── frontend/
└── README.md

---

## Setup Instructions

### Backend
cd backend  
npm install  
npm run dev  

### Frontend
cd frontend  
npm install  
npm run dev  

---

## API Endpoints

### Auth
- POST /api/auth/register  
- POST /api/auth/login  

### Tasks
- GET /api/tasks  
- POST /api/tasks  
- PUT /api/tasks/:id  
- DELETE /api/tasks/:id  

---

## Notes
- JWT used for secure authentication  
- Clean modular architecture  
- Basic scalable design followed  

---

## Author
Vijay