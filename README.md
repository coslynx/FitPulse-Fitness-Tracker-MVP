<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
FitPulse Fitness Tracker MVP
</h1>
<h4 align="center">A simple, effective, and socially engaging fitness tracking web application</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-React-blue" alt="React Framework">
  <img src="https://img.shields.io/badge/Frontend-TypeScript%2C_HTML%2C_CSS-red" alt="Frontend Technologies">
  <img src="https://img.shields.io/badge/Backend-Node.js%2C_Express.js-blue" alt="Backend Technologies">
  <img src="https://img.shields.io/badge/Database-MongoDB-black" alt="MongoDB Database">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/FitPulse-Fitness-Tracker-MVP?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/FitPulse-Fitness-Tracker-MVP?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/FitPulse-Fitness-Tracker-MVP?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
This repository contains the FitPulse Fitness Tracker MVP, a web application designed to help users set, track, and share their fitness goals.  Built with a focus on simplicity and user engagement, it provides a streamlined experience for consistent fitness tracking. The core tech stack includes React for the frontend, Node.js with Express.js for the backend API, and MongoDB for data persistence.


## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| 🧑‍💻 | User Authentication | Secure user registration and login using email/password.  Password hashing is done using bcrypt. JWTs are used for authentication.|
| 🎯  | Goal Setting        | Users can define custom fitness goals with specific targets and deadlines.  Supports various goal types (weight loss, distance, etc.).|
| 📈  | Progress Tracking    | Users log their workouts, and the app calculates progress toward their goals.  Progress is visualized using charts.|
| 🗣️ | Social Sharing      | Users can share progress updates via a simple copy-to-clipboard feature (Direct social media integration is a future enhancement).|
| 📊  | Data Visualization  | Progress toward goals is displayed using charts, providing clear visual feedback.|
| 📱  | Responsive Design   | The application is responsive across different devices (desktop, tablet, mobile).|

## 📂 Structure
```text
fitness-tracker/
├── apps/
│   └── web/          // React frontend application
│       ├── package.json
│       ├── public/
│       │   └── index.html
│       ├── src/
│       │   ├── App.tsx
│       │   ├── index.tsx
│       │   ├── components/ ...
│       │   ├── pages/ ...
│       │   └── ...
│       └── ...
└── backend/         // Node.js/Express backend API
    ├── package.json
    ├── src/
    │   └── server.ts
    └── ...
```

## 💻 Installation
### 🔧 Prerequisites
- Node.js v18+
- npm 8+
- MongoDB 6.0+

### 🚀 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/coslynx/FitPulse-Fitness-Tracker-MVP.git
   cd FitPulse-Fitness-Tracker-MVP
   ```
2. Navigate to the frontend directory:
    ```bash
    cd apps/web
    ```
   Install frontend dependencies:
   ```bash
   npm install
   ```
3. Navigate to the backend directory:
   ```bash
   cd ../../backend
   ```
   Install backend dependencies:
   ```bash
   npm install
   ```
4. Set up the database (ensure MongoDB is running):
   - You'll need to create a database named "fitness-tracker" in your MongoDB instance.  No additional setup is required for this MVP.

5. Configure environment variables:
   - Create a `.env` file in both the frontend (`apps/web`) and backend directories, using the `.env.example` files as templates, and fill in your `JWT_SECRET` and database connection string.


## 🏗️ Usage
### 🏃‍♂️ Running the MVP
1. Start the backend development server:
   ```bash
   cd ../../backend
   npm run dev
   ```
2. In a separate terminal, start the frontend development server:
   ```bash
   cd ../../apps/web
   npm run dev
   ```
3. Access the application:
   - Web interface: `http://localhost:3000`
   - API endpoint (for testing purposes): `http://localhost:3001/api`

### ⚙️ Configuration
- Environment variables are stored in `.env` files (frontend and backend).
- `JWT_SECRET` in `.env` is crucial for secure authentication.  Make sure this is set to a strong, unique value.

### 📚 Examples
- **User Registration:**  Use the web interface to create an account.
- **Setting a Fitness Goal:**  Navigate to the Goals page, fill out the form, and create a goal.
- **Logging a Workout:**  Navigate to the Workouts page, record your workout data, and save it.

## 🌐 Hosting
This MVP can be deployed to any platform that supports Node.js and React applications. Heroku is a suggested option.  You'll need to configure the environment variables appropriately for your chosen platform.

## 📄 License & Attribution

### 📄 License
This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.

### 🤖 AI-Generated MVP
This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).

No human was directly involved in the coding process of the repository: FitPulse-Fitness-Tracker-MVP

### 📞 Contact
For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
- Website: [CosLynx.com](https://coslynx.com)
- Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
<img src="https://img.shields.io/badge/Developers-Drix10%2C_Kais_Radwan-red" alt="Developers">
<img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="CosLynx Website">
<img src="https://img.shields.io/badge/Backed_by-Google%2C_Microsoft_&_Amazon_for_Startups-red" alt="Backed By">
<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4%2C_v6-black" alt="Backdrop Build Finalist">
</div>
```