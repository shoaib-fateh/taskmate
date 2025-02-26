# TaskMate

## The Story Behind It 🚀

In a world filled with powerful task management tools like Trello, Asana, and ClickUp, why does TaskMate exist? Because these platforms, while great, are often too complex, bloated, or expensive for small teams and freelancers who just need a simple, fast, and effective way to manage tasks.

### The Problem 😵

1. **Too Much Complexity** – Big platforms are packed with features most small teams never use. Instead of helping, they slow down productivity.
2. **Slow & Heavy UIs** – Many of these apps have clunky interfaces that feel slow and overwhelming.
3. **Expensive for Small Teams** – Many platforms charge high monthly fees or limit free users, making them unaffordable for freelancers and startups.
4. **Lack of Focused Communication** – Switching between tools like Slack, Trello, and Google Docs is a mess. No single tool brings tasks, chat, and collaboration together seamlessly.

### How TaskMate Solves This ⚡

- **Minimal Yet Powerful** – No unnecessary features, just what you actually need:
  - **Create & Manage Tasks** – Simple, clean UI with drag-and-drop.
  - **Prioritize & Set Deadlines** – Without overwhelming options.
  - **Real-Time Collaboration** – Built-in team chat inside tasks.
  - **Lightweight & Fast** – Optimized for speed, no bloat.
  - **Affordable & Scalable** – Free for small teams, premium for growth.

### Why TaskMate Instead of Trello/Asana?

- **Speed & Simplicity** – No learning curve; get started instantly.
- **Built-in Chat** – Discuss tasks inside the app—no need for Slack.
- **Customizable Workflows** – Unlike rigid platforms, TaskMate adapts to how your team works.
- **Seamless Integration** – Easily connects with existing tools (Google Drive, Notion, etc.).
- **Mobile-First Experience** – Perfect for freelancers & remote teams on the go.

### TL;DR – Why TaskMate?

"Because task management shouldn’t feel like a task itself. We built TaskMate to be fast, lightweight, and distraction-free—focusing on what matters most: getting work done."

---

## Tech Stack

- **Front-end:** Next.js + Tailwind CSS (using shadcn/ui for ready-made, customizable, component-based UI with built-in dark/light mode support)
- **Authentication:** Firebase Authentication
- **Back-end:** Node.js (Express)
- **Database:** Firebase Firestore

---

## Project Structure

### Frontend (Next.js)
```
taskmate/
├── app/              # Next.js pages & components
│   ├── dashboard/    # Main UI for tasks
│   ├── auth/         # Login & Signup UI
├── components/       # Reusable UI components – buttons, modals, etc.
├── lib/              # API client – fetch tasks, auth, etc.
├── styles/           # Tailwind global styles, themes
├── config/           # Environment variables, API endpoints
├── next.config.js    # Next.js settings
└── .env.local        # API URLs for backend
```

### Backend (Node.js + Express)
```
taskmate-backend/
├── src/                # Backend logic & routes
│   ├── routes/         # API endpoints – /tasks, /auth
│   ├── controllers/    # Task & Auth logic
│   ├── middlewares/    # Authentication, error handling
│   ├── server.js       # Express app entry point
│   └── firebase.js     # Firebase connection: Firestore & Auth
├── config/             # CORS, JWT, ENV settings
├── package.json        # Backend dependencies
└── .env                # Secret keys, Firebase config
```

---

## Deployment

- **Frontend (Next.js):** Vercel
- **Backend (Node.js API):** Railway
- **Database (Firestore):** Firebase
- **Authentication:** Firebase Auth

---

## GitHub Repository Setup

- **Main Repo (Monorepo Style):** `taskmate`  
  *(Contains frontend/ and backend/ folders)*
- **Separate Repos:**  
  - Frontend Repo: `taskmate-frontend`  
  - Backend Repo: `taskmate-backend`

---

## Firebase Project Configuration

- **Project Name:** TaskMate (or taskmate-app if TaskMate is taken)
- **Firebase App ID:** taskmate-app
- **Firestore Database Name:** taskmate-db
- **Firebase Storage Bucket:** taskmate-files

---

## Deployment & Cloud Services

| Service                         | Name to Use            |
|---------------------------------|------------------------|
| Vercel Project (Frontend)       | taskmate-frontend      |
| Railway App (Backend)           | taskmate-backend       |
| Firestore Database              | taskmate-db            |
| Storage (Firebase Storage)      | taskmate-files         |
| Authentication (Firebase Auth)  | taskmate-auth          |

---

## Domain Name (Optional, but Recommended)

If you plan to use a custom domain later, consider checking the availability of:
- **taskmate.app** (Best for SaaS)
- **taskmate.io** (Tech startup vibe)
- **taskmate.dev** (For developer branding)
- **taskmate.work** (Good for productivity apps)
