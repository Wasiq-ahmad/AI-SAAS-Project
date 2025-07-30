# 🧠 AI SaaS Platform

An AI-powered SaaS platform offering intelligent tools to generate blog content, review resumes, and assist with writing — helping individuals and businesses save time and elevate quality. Built using FastAPI and ReactJS, it combines smart AI agents with a clean, user-friendly experience.

---

## 🚀 Features

- 🔐 **User Authentication**
  - Sign up/Login with Email & Password
  - Google OAuth integration

- 🤖 **AI Assistant Tools**
  - **AI Blog Title Generator** – Generate attention-grabbing blog titles
  - **AI Article Writer** – Expand ideas into complete, SEO-friendly articles
  - **AI Resume Reviewer** – Analyze and improve resumes with AI suggestions
  - General-purpose AI Assistant (chat-style interface)

- 🧠 **Vector Memory (FAISS)**
  - Store and retrieve previous assistant queries & responses
  - Display memory in a structured chat format:
    - `user_input: ...`
    - `LLM_output: ...`

- 📬 **File & Export Tools**
  - Generate downloadable **PDF**, **DOCX**, or **PPT** files
  - Send outputs directly to user email

- 📊 **Usage Analytics**
  - Tracks assistant usage per user
  - Admin dashboard for usage insights

---

## 🛠️ Tech Stack

| Layer        | Technology                      |
| ------------ | ------------------------------- |
| Frontend     | React.js, Tailwind CSS          |
| Backend      | FastAPI, Python                 |
| Auth         | JWT, Google OAuth               |
| AI Models    | OpenAI SDK                      |
| Vector Store | FAISS                           |
| Database     | PostgreSQL or MongoDB           |
| Deployment   | Docker, Vercel, Render, Hugging Face |

---

## 📂 Project Structure

├── frontend/ # React Frontend
│ └── src/components/
│ └── src/pages/
├── backend/ # FastAPI Backend
│ └── routers/ # API routes (auth, tools, etc.)
│ └── agents/ # AI tool logic (writer, reviewer, etc.)
│ └── services/ # Utility services (email, file gen, etc.)
├── vector_store/ # FAISS indexes for memory
├── utils/ # File conversion & helper functions
