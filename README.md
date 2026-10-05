# PlacePrep - Placement Preparation Portal 🎓

![PlacePrep Banner](https://img.shields.io/badge/PlacePrep-Emerald_Theme-10b981?style=for-the-badge)

PlacePrep is a comprehensive, full-stack web application designed to help college students streamline their campus placement preparation. It brings together Quantitative Aptitude, Data Structures & Algorithms (DSA), and Interview Resources into a single, unified platform with progress tracking.

---

## 🌟 Features

### 👨‍🎓 For Students
*   **Aptitude Practice:** Timed quizzes covering quantitative, logical, and verbal reasoning.
*   **Coding Challenges:** Curated DSA problems categorized by topic and difficulty, with progress tracking.
*   **Interview Prep:** Study HR, Technical, and CS Fundamental questions.
*   **Resource Hub:** Centralized collection of the best articles, videos, and learning materials.
*   **Interactive Dashboard:** Track your solved problems, quiz history, and overall preparation progress.

### 👨‍💼 For Administrators
*   **Role-Based Access Control:** Secure admin dashboard protected via JWT.
*   **Content Management (CRUD):** Easily add, edit, or delete aptitude questions, coding problems, interview questions, and external resources.
*   **Real-Time Sync:** Content updates are immediately reflected for all students.

---

## 📸 Screenshots

*(To display the screenshots you took, create a folder named `screenshots` in this repository, save your images there, and name them exactly as shown below!)*

### Student Dashboard
![Dashboard](./screenshots/dashboard.png)

### Aptitude Quiz Selection
![Aptitude](./screenshots/aptitude.png)

### Coding Problems Tracker
![Coding](./screenshots/coding.png)

### Interview Questions Hub
![Interview](./screenshots/interview.png)

### Resources Library
![Resources](./screenshots/resources.png)

---

## 🛠️ Technology Stack

*   **Frontend:** React.js, Vite, React Router, Custom CSS (Emerald Green/Zinc Theme)
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB, Mongoose
*   **Authentication:** JSON Web Tokens (JWT), bcryptjs

---

## 🚀 Local Installation & Setup

Follow these steps to run PlacePrep on your local machine.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/PlacePrep.git
cd PlacePrep
```

### 2. Setup the Backend (Server)
```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

Run the seed script to populate the database with initial questions and users (Admin & Student):
```bash
npm run seed
```

Start the backend server:
```bash
npm start
```

### 3. Setup the Frontend (Client)
Open a new terminal window and navigate to the client folder:
```bash
cd client
npm install
```

Start the Vite development server:
```bash
npm run dev
```

The application will now be running at `http://localhost:3000`.

---

## 🔑 Default Seeded Accounts
If you ran the `npm run seed` command, you can log in with:
*   **Admin:** `admin@placeprep.com` / `admin123`
*   **Student:** `student@placeprep.com` / `student123`

---

## 🌐 Deployment
This project is configured to be easily deployed for free:
*   **Frontend:** [Vercel](https://vercel.com/) (Requires setting the `VITE_API_URL` environment variable)
*   **Backend:** [Render](https://render.com/)
*   **Database:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

*Designed and developed as a college project to empower students for successful campus placements.*
