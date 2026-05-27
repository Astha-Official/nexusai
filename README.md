# 🧠 NexusAI — Conversational Campus Intelligence Assistant

A **full-stack AI-powered campus assistant** built with Node.js, Express, and Claude AI (claude-sonnet-4). Enables context-aware, multi-turn conversations to help students with placements, academics, career guidance, and campus life.

---

## 📁 Project Structure

```
nexusai/
├── backend/
│   ├── server.js        ← Express API server + Claude AI integration
│   └── package.json     ← Backend dependencies
├── frontend/
│   └── index.html       ← Full chatbot UI (Vanilla JS, no framework)
└── README.md
```

---

## 🚀 How to Run

### Prerequisites
- **Node.js** (v18 or above) → https://nodejs.org
- **Anthropic API Key** → https://console.anthropic.com

### Step 1 — Install Dependencies
```bash
cd backend
npm install
```

### Step 2 — Set API Key & Start Backend

**Windows (CMD):**
```cmd
set ANTHROPIC_API_KEY=sk-ant-your-key-here
node server.js
```

**Mac/Linux:**
```bash
export ANTHROPIC_API_KEY=sk-ant-your-key-here
node server.js
```

You should see:
```
🧠 NexusAI Backend running at http://localhost:3001
✅ Health check: http://localhost:3001/api/health
```

### Step 3 — Open Frontend
Open `frontend/index.html` in your browser. Done!

---

## 💡 Key Features

| Feature | Details |
|---|---|
| 🤖 AI Model | Anthropic Claude claude-sonnet-4-20250514 |
| 💬 Multi-turn Memory | Full conversation history passed per request |
| 🧠 Domain-scoped Prompt | Custom system prompt for campus context |
| 💼 Placement Help | Resume tips, interview prep, company profiles |
| 📚 Academic Support | Study strategies, exam tips, syllabus guidance |
| 🗺️ Career Roadmaps | Software, Data Science, Design, and more |
| 😊 Wellbeing | Stress management, motivation |
| 📱 Responsive UI | Dark theme, sidebar navigation, mobile-ready |

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JS |
| Backend | Node.js + Express.js |
| AI Model | Anthropic Claude (claude-sonnet-4-20250514) |
| API Style | REST API |
| Fonts | Syne + DM Sans (Google Fonts) |
| Icons | Font Awesome 6 |

---

## 🎯 Interview Explanation Points

1. **Architecture**: Client-server separation — frontend ↔ REST API ↔ Claude AI
2. **Multi-turn Memory**: Full `conversationHistory` array sent to Claude each time, enabling context-aware follow-ups
3. **Prompt Engineering**: Domain-scoped system prompt restricts Claude to campus context with defined tone and format
4. **Scalability**: Can extend with user auth, database-backed chat history, multiple AI models
5. **UX Design**: Typing indicator, animated bubbles, sidebar navigation, mobile responsiveness

---

*Built with NexusAI using Claude AI by Anthropic*
