const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + GROQ_API_KEY
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: "You are NexusAI - a campus assistant for college students. Help with placements, academics, career guidance and wellbeing. Be encouraging and use emojis."
          },
          ...messages
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    res.json({ reply });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", model: "groq-llama3" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("NexusAI running on port " + PORT);
});