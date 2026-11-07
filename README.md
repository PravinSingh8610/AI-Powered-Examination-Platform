# 🎓 AI-Powered Examination Platform

An intelligent and user-friendly online examination platform designed to simplify the examination process. The platform provides a digital environment where students can register, log in, attend online examinations, and view their examination results.

Built using **React.js, Spring Boot, and Java**, this project follows a frontend-backend architecture to provide a structured and scalable examination management system.

---

## 🚀 Project Overview

The **AI-Powered Examination Platform** is a web-based application designed to make online examinations easier, smarter, and more efficient.

It provides a student-friendly interface with authentication, examination instructions, online exam participation, student dashboard, and result management.

## ✨ Features

- 🔐 User Authentication – Student registration and login.
- 🏠 Home Page – User-friendly landing page.
- 📋 Exam Instructions – Displays examination guidelines.
- 📝 Online Examination – Interface for attempting exams.
- 📊 Student Dashboard – Displays student information.
- 📈 Result Management – View examination results.
- 🔗 REST API Integration – Connects frontend and backend.
- 🗄️ Backend Architecture – Controller, Service, Repository, and Entity layers.

## 🛠️ Technologies Used

### Frontend
- React.js
- JavaScript (ES6+)
- HTML5
- CSS3
- Vite
- Node.js & npm

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- Spring Web
- Maven
- REST APIs

### Development Tools
- Spring Tools Suite (STS)
- Visual Studio Code
- Git & GitHub
- Postman

## 📁 Project Structure

```text
AI-Powered-Examination-Platform/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/example/demo/
│   │   │   │       ├── BackendApplication.java
│   │   │   │       ├── controller/
│   │   │   │       │   └── UserController.java
│   │   │   │       ├── entity/
│   │   │   │       │   └── User.java
│   │   │   │       ├── repository/
│   │   │   │       │   └── UserRepository.java
│   │   │   │       └── service/
│   │   │   │           └── UserService.java
│   │   │   └── resources/
│   │   │       ├── static/
│   │   │       ├── templates/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml
│   └── mvnw
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   │   ├── Exam.jsx
│   │   │   ├── ExamInstructions.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Result.jsx
│   │   │   └── StudentDashboard.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/YOUR-USERNAME/AI-Powered-Examination-Platform.git
```

### 2. Navigate to Project

```bash
cd AI-Powered-Examination-Platform
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

### 4. Backend Setup

1. Open the backend folder in Spring Tool Suite (STS).
2. Configure database settings in `application.properties`, if required.
3. Update database credentials.
4. Run `BackendApplication.java` as a Spring Boot App.

Backend URL (if configured on port 8081):

```text
http://localhost:8081
```

## 🔄 Application Architecture

```text
       React.js Frontend
               |
            REST APIs
               |
       Spring Boot Backend
               |
       ------------------
       |        |       |
   Controller Service Repository
                        |
                      Entity
                        |
                     Database
```

## 🎯 Future Enhancements

- AI-Based Online Proctoring.
- Face Detection and Recognition.
- Suspicious Activity Detection.
- Automatic Evaluation System.
- AI-Based Performance Analysis.
- Question Bank Management.
- Admin Dashboard.
- Secure Examination Environment.

## ⭐ Support

If you find this project useful, please give it a ⭐ on GitHub.

**Thank you for visiting my project!**
