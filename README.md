# 🚀 Employee Management System (EMS)

A backend-focused Employee Management System built using **Spring Boot** following **clean architecture principles**.

> ⚡ This project emphasizes clean code, modular structure, and scalable backend design.

---

## 🧱 Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- PostgreSQL (planned: Neon / local)
- Lombok

### Frontend
- 🚧 Not implemented yet (planned: Next.js + Tailwind CSS)

---

## 📂 Project Structure
backend/
└── src/main/java/com/minarath/ems/
├── core/
│ ├── common/
│ │ ├── exception/
│ │ ├── response/
│ │ ├── util/
│ │ └── validation/
│ └── config/
│
└── modules/
└── employee/
├── controller/
├── service/
│ └── impl/
├── repository/
├── dto/
├── domain/
└── exception/

---

## ✨ Features Implemented

- Create Employee
- Get All Employees
- Get Employee by ID
- Update Employee
- Delete Employee

---

## 🧠 Architecture Highlights

- ✅ Modular architecture (core + modules)
- ✅ DTO pattern (no entity exposure)
- ✅ Service layer abstraction
- ✅ Custom exception handling
- ✅ Clean and maintainable code structure

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

## ⚙️ How to Run Backend

```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run

🐘 Database
Database integration is planned
Can be configured with:
PostgreSQL (local)
Neon (cloud PostgreSQL)


📌 Current Status

✅ Backend completed with full CRUD functionality
🚧 Frontend development in progress

📸 Future Improvements
Frontend UI (Next.js + Tailwind)
Database integration (Neon)
Pagination & search
API documentation

👨‍💻 Author

Mohammad Aafiq