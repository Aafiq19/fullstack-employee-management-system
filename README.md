A modern **full-stack Employee Management System** built with a clean architecture approach, featuring a scalable Spring Boot backend and a sleek Next.js frontend.

> ⚡ Designed with a focus on **clean code, maintainability, and professional UI/UX**

---

## ✨ Overview

This application allows users to manage employee records efficiently with full CRUD functionality, backed by a robust REST API and a modern responsive interface.

---

## 🧱 Tech Stack

### 🔹 Backend
- Java 17
- Spring Boot
- Spring Data JPA
- PostgreSQL (Neon / Local)
- Lombok

### 🔹 Frontend
- Next.js
- Tailwind CSS
- Axios

---

## 📂 Project Structure

employee-management-system/
│
├── backend/
│   └── src/main/java/com/minarath/ems/
│       ├── core/
│       │   ├── common/
│       │   │   ├── exception/
│       │   │   ├── response/
│       │   │   ├── util/
│       │   │   └── validation/
│       │   └── config/
│       │
│       └── modules/
│           └── employee/
│               ├── controller/
│               ├── service/
│               │   └── impl/
│               ├── repository/
│               ├── dto/
│               ├── domain/
│               └── exception/
│
├── frontend/
│   ├── app/ (or pages/)
│   │   ├── employees/
│   │   │   ├── page.tsx
│   │   │   ├── create/
│   │   │   └── edit/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── EmployeeTable.jsx
│   │   ├── EmployeeForm.jsx
│   │   └── Navbar.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   └── package.json
│
└── README.md

---

## 🎯 Features

### 🧑‍💼 Employee Management
- ➕ Add new employees  
- 📋 View all employees  
- 🔍 View employee details  
- ✏️ Update employee information  
- ❌ Delete employees  

---

## 🧠 Architecture Highlights

- ✅ Clean modular architecture (core + modules)
- ✅ DTO pattern (no entity exposure)
- ✅ Service layer abstraction
- ✅ Global exception handling
- ✅ Standardized API responses
- ✅ Separation of concerns

---

## 🎨 UI Highlights

- ✨ Modern and minimal design  
- 📱 Responsive layout (mobile-friendly)  
- 🎯 Clean forms and tables  
- 🧩 Reusable components  
- ⚡ Smooth user interactions  

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|---------|------------|
| POST | /employees | Create employee |
| GET | /employees | Get all employees |
| GET | /employees/{id} | Get employee by ID |
| PUT | /employees/{id} | Update employee |
| DELETE | /employees/{id} | Delete employee |

---

## ⚙️ Getting Started

### 🔹 Clone Repository
git clone <your-repo-url>
cd employee-management-system 

🔹 Backend Setup
cd backend
./mvnw clean install
./mvnw spring-boot:run

🔹 Frontend Setup
cd frontend
npm install
npm run dev

🐘 Database Configuration

Update your database credentials in:
backend/src/main/resources/application.properties

Example:
spring.datasource.url=YOUR_DATABASE_URL
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

🚀 Future Enhancements
🔍 Search & filtering
📄 Pagination
🔐 Authentication & authorization
📊 Dashboard analytics

📌 Project Goal

This project focuses on:

💡 Building a simple system the right way rather than building a complex system the wrong way

👨‍💻 Author
Mohammad Aafiq

⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!

---
