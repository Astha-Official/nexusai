const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are NexusAI — a conversational campus intelligence assistant designed for college students. You help with placements, academics, campus life, career guidance, and mental wellbeing. Be encouraging, use bullet points and emojis, keep responses concise but complete.`;

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const contents = messages.map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: contents
        })
      }
    );

    const data = await response.json();
    const reply = data.candidates[0].content.parts[0].text;
    res.json({ reply });

  } catch (error) {
    console.error("NexusAI API Error:", error.message);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", project: "NexusAI", model: "gemini-1.5-flash", message: "NexusAI backend is running!" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n🧠 NexusAI Backend running at http://localhost:${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/api/health\n`);
});