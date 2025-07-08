# 🚀 HackOrbit Hackathon Submission – MITS University

PPT - https://1drv.ms/p/c/af6e9ba4a0c5e71a/EVLLBM0g3-NFshFF9cCM4i8BTMpQo-tl8QAR1EPt__9I1A?e=tn9D2e

### 👥 Team Name: Tech Heros  
### 🏫 University: MITS University  
### 🏆 Hackathon: HackOrbit

> _"Our project empowers students and job seekers to analyze their resumes, discover missing skills, and receive personalized learning paths using AI."_

---

## 💡 Project Overview

**MITS CareerBoost** is an AI-powered platform designed to accelerate career growth for students and job seekers. Built for the HackOrbit hackathon at MITS University, our platform provides:

- Instant, AI-driven resume analysis
- Skills gap detection for targeted roles
- Personalized upskilling and learning path suggestions
- Insights into current job market trends

---

## 🔑 Key Features

- 📄 **Resume Analysis**  
  Upload your resume and receive instant, AI-generated feedback highlighting strengths and areas for improvement.

- 📉 **Skills Gap Detection**  
  The system compares your current skills with those required for trending roles and technologies, helping you identify what you need to learn next.

- 📚 **Personalized Learning Paths**  
  Get curated roadmaps and course recommendations tailored to your career goals and skill gaps.

- 🧭 **Visual Progress Tracking**  
  Track your upskilling journey and see your progress as you complete recommended learning modules.

- 🤖 **AI Chatbot Guidance**  
  Interact with an AI-powered chatbot for career advice, resume tips, and personalized suggestions.

- 📈 **Career Forecasting (Planned)**  
  Predict job market trends and future skill demands using AI-driven analytics.

- ✉️ **Smart Outreach (Planned)**  
  Automatically draft personalized emails to recruiters and hiring managers based on your profile and target roles.

---

## 🛠 Tech Stack

| Frontend        | Libraries / Tools              |
|-----------------|--------------------------------|
| React + TypeScript | Vite, Tailwind CSS, shadcn/ui |
| Icons & UI Logic | lucide-react, react-query     |

---

## 🚀 How to Run Locally

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

---

## 🌟 Built with passion for HackOrbit at MITS University

## Backend Email Service

A simple Express backend is provided in the `backend/` folder to send emails via Gmail SMTP.

### Setup
1. Go to the `backend/` folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file with the following:
   ```env
   GMAIL_USER=your_gmail_address@gmail.com
   GMAIL_PASS=your_gmail_app_password
   PORT=5000
   ```
   - You must use a Gmail App Password (not your regular password). See: https://support.google.com/accounts/answer/185833

4. Start the backend:
   ```sh
   npm start
   ```

### API Endpoint
- `POST /api/send-email`
  - Body: `{ to: string, subject: string, text: string }`

---
