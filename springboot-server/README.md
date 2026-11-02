# PlacePrep - Spring Boot Backend Assessment Engine 🚀

This module is the **Java Spring Boot 3** backend service for the PlacePrep campus placement preparation portal.

---

## 🏗️ Architecture & Design Pattern

The service follows standard enterprise multi-tier architecture:

1. **Controller Layer (`@RestController`):**
   Handles incoming HTTP requests (GET, POST, PUT, DELETE), parses JSON payloads and parameters, and returns `ResponseEntity<ApiResponse<T>>`.
2. **Service Layer (`@Service`):**
   Contains all business logic, placement readiness KPI algorithms, and quiz scoring engines.
3. **Repository Layer (`@Repository`):**
   Extends Spring Data JPA's `JpaRepository` to perform CRUD operations without manual boilerplate SQL queries.
4. **Entity Model Layer (`@Entity`):**
   JPA/Hibernate entities mapped to relational database tables with proper validations and relations.
5. **Seeder Layer (`CommandLineRunner`):**
   Automatically preloads mock placement data, Java & Spring Boot interview questions, aptitude quizzes, and DSA challenges on application boot.

---

## 📡 REST API Endpoints

### 1. Authentication (`/api/auth`)
* `POST /api/auth/register` - Register student or admin account
* `POST /api/auth/login` - Authenticate and retrieve session token
* `GET  /api/auth/me` - Retrieve current user profile

### 2. Aptitude Quizzes (`/api/aptitude`)
* `GET  /api/aptitude/questions` - Retrieve aptitude questions (with category/difficulty filters)
* `GET  /api/aptitude/questions/{id}` - Get individual question details
* `GET  /api/aptitude/quiz` - Generate a random 5-10 question timed quiz
* `POST /api/aptitude/attempt` - Submit answers and calculate score & accuracy
* `GET  /api/aptitude/history` - Retrieve quiz history for the authenticated student

### 3. DSA Coding Challenges (`/api/coding`)
* `GET  /api/coding` - Retrieve curated DSA problems with student solve status
* `GET  /api/coding/{id}` - Get problem details and code constraints
* `POST /api/coding/{id}/complete` - Toggle solved state for the student

### 4. Technical & HR Interview Questions (`/api/interview`)
* `GET  /api/interview` - Retrieve Java, Spring Boot, OOP, OS, DBMS questions
* `GET  /api/interview/{id}` - Get question and comprehensive model answer
* `POST /api/interview/{id}/complete` - Mark question as completed

### 5. Placement Dashboard & KPIs (`/api/dashboard`)
* `GET  /api/dashboard` - Real-time metrics:
  * Placement Readiness Index (weighted score)
  * Coding solve percentage
  * Quiz accuracy rate
  * Solved problems counters

### 6. Admin Content Management (`/api/admin`)
* `POST /api/admin/aptitude`, `PUT /api/admin/aptitude/{id}`, `DELETE /api/admin/aptitude/{id}`
* `POST /api/admin/coding`, `PUT /api/admin/coding/{id}`, `DELETE /api/admin/coding/{id}`
* `POST /api/admin/interview`, `PUT /api/admin/interview/{id}`, `DELETE /api/admin/interview/{id}`
* `POST /api/admin/resources`, `PUT /api/admin/resources/{id}`, `DELETE /api/admin/resources/{id}`

---

## 💻 Tech Stack
* **Java:** Version 17 / 21 / 23
* **Framework:** Spring Boot 3.2.0
* **Persistence:** Spring Data JPA / Hibernate
* **Database:** H2 In-Memory (or MySQL 8 / PostgreSQL)
* **API Documentation & Testing:** Postman / cURL
