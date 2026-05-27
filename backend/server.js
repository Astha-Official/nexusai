const express = require("express");
const cors = require("cors");
const Anthropic = require("@anthropic-ai/sdk");

const app = express();
app.use(cors());
app.use(express.json());

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ── Domain-scoped system prompt with custom AI persona ────────────
const SYSTEM_PROMPT = `You are NexusAI — a conversational campus intelligence assistant designed for college students.
You are knowledgeable, warm, and concise. You help students with:

- 📚 Academics: courses, syllabus, study strategies, exam preparation, assignment guidance
- 🎓 Placements: resume building, interview preparation, coding problems, aptitude tests, company profiles, internship guidance
- 🏛️ Campus Life: hostel, mess, clubs, events, sports, fest information
- 📝 Admissions: fees, documents, enrollment procedures, scholarships
- 🧠 Career Guidance: domain selection, roadmaps for software engineering, data science, UI/UX design, etc.
- 😊 Mental Health & Wellbeing: stress management, motivation, time management techniques

Personality:
- Be encouraging and solution-focused
- Use bullet points and relevant emojis to make responses scannable
- Keep responses concise but complete
- If you don't have specific college data, give accurate general guidance
- Always end with a useful follow-up suggestion or question to continue the conversation

You maintain full context of the conversation history sent with each request, enabling context-aware, multi-turn dialogue.`;

// ── REST API: /api/chat ────────────────────────────────────────────
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format. Expected an array." });
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages,         // full conversation history for multi-turn memory
    });

    res.json({ reply: response.content[0].text });

  } catch (error) {
    console.error("NexusAI API Error:", error.message);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

// ── Health check endpoint ─────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    project: "NexusAI — Conversational Campus Intelligence Assistant",
    model: "claude-sonnet-4-20250514",
    message: "NexusAI backend is running!",
  });
});

// ── Start server ──────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n🧠 NexusAI Backend running at http://localhost:${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/api/health\n`);
});
