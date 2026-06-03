# 📚 NewPage – AI Study Assistant

An AI-powered study assistant that helps students organize notes, summarize PDFs, generate quizzes, create study plans, and interact with learning materials through AI.

---

## 📑 Table of Contents

* [Project Overview](#-project-overview)
* [Features](#-features)
* [Built With](#-built-with)
* [Getting Started](#-getting-started)
* [Installation](#-installation)
* [Environment Variables](#-environment-variables)
* [Usage](#-usage)
* [Roadmap](#-roadmap)
* [Author](#-author)

---

## 🎯 Project Overview

Students often spend a significant amount of time organizing notes, reading lengthy PDFs, creating revision plans, and testing their understanding.

**NewPage** simplifies this process by combining AI-powered learning tools into a single platform. Users can upload study material, generate summaries, ask questions from notes, create quizzes, and build personalized study plans.

The goal is to improve productivity and make learning more efficient.

---

## 🚀 Features

### 🔐 Authentication

* Secure user registration and login
* JWT-based authentication
* Protected routes

### 📅 AI Study Planner

* Generate personalized study schedules
* Save and manage study plans
* Delete completed plans

### 📄 PDF Upload & Summarization

* Upload PDF notes
* Extract text automatically
* Generate AI-powered summaries

### 💬 Chat with PDF

* Ask questions related to uploaded notes
* Context-aware AI responses

### 📝 Quiz Generator

* Generate MCQs from uploaded PDFs
* Instant self-assessment

### 📚 Notes History

* Store uploaded notes
* Revisit summaries anytime

---

## 🛠️ Built With

### Frontend

* React.js
* Vite
* Axios
* React Router

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### AI Services

* OpenRouter API
* DeepSeek Models
* Google Gemma Models

### Additional Tools

* JWT Authentication
* Multer
* PDF-Parse

---

## 🚀 Getting Started

Follow the instructions below to run the project locally.

### Prerequisites

Make sure you have:

* Node.js installed
* npm installed
* MongoDB Atlas account
* OpenRouter API key

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/ARC-FROST/NewPage_study_assistant.git
cd NewPage_study_assistant
```

### Backend Setup

```bash
cd BACKEND
npm install
npm run dev
```

### Frontend Setup

```bash
cd FRONTEND
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `BACKEND` folder.

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

OPENROUTER_API_KEY=your_openrouter_api_key

OPENROUTER_MODEL=deepseek/deepseek-chat
```

---

## 💡 Usage

1. Create an account or log in.
2. Upload a PDF document.
3. Generate an AI summary.
4. Ask questions about the uploaded notes.
5. Generate quizzes for revision.
6. Create and manage study plans.

---

## 🗺️ Roadmap

### Completed ✅

* User Authentication
* Study Planner
* PDF Upload
* AI Summarization
* Chat with PDF
* Quiz Generation
* Notes History
* MongoDB Integration

### Planned 🚧

* Flashcard Generation
* Smart Revision Scheduler
* Learning Analytics Dashboard
* Advanced PDF Search
* Voice-Based Study Assistant
* Multi-PDF Knowledge Base

---

## 👨‍💻 Author

**Ashish Kumar**
🎓 B.Tech Student, IIT Roorkee

GitHub: https://github.com/ARC-FROST

Email: [ashishk7.ak7@gmail.com](mailto:ashishk7.ak7@gmail.com)

---

## ⭐ Why This Project?

NewPage was built to explore the integration of modern AI models with educational tools and to create a practical solution that helps students study more effectively using intelligent automation.
