# Smart Contact Manager - Cloud Address Book

Smart Contact Manager is a production-ready, full-stack web application built to organize, secure, and manage personal and professional contacts on the cloud. The application features a responsive React frontend hosted on Vercel, a secure Spring Boot backend containerized with Docker on Render, cloud image storage on Cloudinary, and a serverless MySQL-compatible database on TiDB Cloud.

**Live Application:** [https://mycontactbook.vercel.app](https://mycontactbook.vercel.app)  
**Backend API Base:** `https://smartcontact-hrk5.onrender.com`

---

## 🚀 Key Features

### Authentication & Security
- **User Registration & Login:** Secure onboarding with server-side validation and BCrypt password hashing.
- **Role-Based Access Control:** Protected routes and endpoints secured via Spring Security (`ROLE_USER`).
- **Owner Verification:** Strict backend authorization ensuring users can only view, edit, or delete their own contacts.

### Contact Management (Full CRUD)
- **Add Contacts with Photos:** Store detailed contact profiles (name, nickname, phone, email, profession, notes) along with profile images uploaded directly to Cloudinary.
- **Smart Search & Listing:** View all contacts in a clean, searchable table with instant filtering by name or phone number.
- **Detailed Contact Profile:** Click any contact to view their full profile card and description.
- **Edit & Delete:** Seamlessly update contact details/images or remove outdated records.

### User Profile & Settings
- **Profile Customization:** View and update personal profile details and profile picture.
- **Password Management:** Change account password securely with old-password verification.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js (Vite)
- **Routing:** React Router DOM (Nested & Protected Routes)
- **Form Handling & Alerts:** React Hook Form, SweetAlert2
- **UI & Styling:** Modern CSS3, Flexbox/Grid, React Icons
- **Deployment:** Vercel

### Backend
- **Framework:** Java 21, Spring Boot 4
- **Security & Web:** Spring Security, RESTful APIs, Multipart File Upload, CORS Configuration
- **ORM / Database Access:** Spring Data JPA, Hibernate 7
- **Containerization & Deployment:** Docker, Render

### Database & Cloud Storage
- **Database:** TiDB Cloud (Serverless MySQL-Compatible)
- **Media Storage:** Cloudinary SDK

---

## 🏗️ Architecture & Workflow

```text
       [ React Frontend (Vercel) ]
                    │
                    │  REST API Requests (JSON / Multipart FormData)
                    ▼
   [ Spring Boot Backend (Render / Docker) ]
                    │
         ┌──────────┴──────────────┐
         ▼                         ▼
[ TiDB Cloud (MySQL DB) ]   [ Cloudinary (Image Storage) ]

```
---

## 💻 Local Development Setup

To run this project locally on your machine, follow these steps:

### Prerequisites
* **Java Development Kit (JDK 21+)**
* **Node.js (v18+)** and `npm`
* **MySQL Server** (local) or **TiDB Cloud** account
* **Cloudinary Account** (for image uploads)
* **Git**

---

### Step 1: Clone the Repository
```bash
git clone https://github.com
cd smartcontact
```

---

### Step 2: Backend Setup (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Configure your environment variables (via IDE `launch.json` or system environment) matching `src/main/resources/application.properties`:
   ```properties
   DATASOURCE_URL=jdbc:mysql://localhost:3306/smartcontact
   DATASOURCE_USERNAMES=root
   DATASOURCE_PASSWORD=your_mysql_password
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
3. Build and run the backend server:
   ```bash
   # Using Maven Wrapper (Linux/Mac)
   ./mvnw spring-boot:run

   # Using Maven Wrapper (Windows)
   mvnw.cmd spring-boot:run
   ```
   *The backend will start at `http://localhost:8080`.*

---

### Step 3: Frontend Setup (React)

1. Open a new terminal window and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install necessary packages:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will start at `http://localhost:5173`.*

---

## 🔗 Key API Endpoints

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/public/signup` | Public | Registers a new user account |
| `POST` | `/public/login` | Public | Authenticates user credentials |
| `GET` | `/public/health` | Public | Health-check endpoint for uptime monitoring |
| `POST` | `/user/add-contact` | Protected | Creates a new contact with image upload |
| `GET` | `/user/contacts` | Protected | Retrieves all contacts for the logged-in user |
| `GET` | `/user/contact/{cid}` | Protected | Fetches complete details of a specific contact |
| `PUT` | `/user/update-contact/{cid}` | Protected | Updates an existing contact and optional image |
| `DELETE` | `/user/contact/{cid}` | Protected | Deletes a specific contact |
| `GET` | `/user/profile` | Protected | Fetches logged-in user profile data |
| `PUT` | `/user/update-profile` | Protected | Updates user name, bio, and profile picture |
| `POST` | `/user/change-password` | Protected | Updates account password after verification |

---

## 🛠️ Deployment & Environment Configuration

The frontend uses dynamic environment configuration in `apiConfig.js` to switch seamlessly between local development and production:

```javascript
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const API_BASE_URL = isLocal 
    ? "http://localhost:8080" 
    : "https://smartcontact-hrk5.onrender.com";
```

---

## 📝 License & Author

Developed with ❤️ for educational and portfolio purposes.  
**Author:** Mohd Zaid  
**GitHub:** [https://github.com/itszaidsidd](https://github.com/itszaidsidd)
