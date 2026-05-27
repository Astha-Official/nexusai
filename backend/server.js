const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.post("/api/chat", async (req, res) => {
  try {
    const messages = req.body.messages || [];

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are NexusAI, a helpful campus assistant for students. Help with placements, academics, career guidance, coding, and wellbeing in a friendly and encouraging way.",
          },
          ...messages,
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiReply =
      response.data.choices &&
      response.data.choices.length > 0
        ? response.data.choices[0].message.content
        : "No AI response";

    res.json({
      reply: aiReply,
    });
  } catch (error) {
    console.log("FULL GROQ ERROR:");
    console.log(error.response?.data || error.message);

    res.status(500).json({
      error: JSON.stringify(
        error.response?.data || error.message || "Something went wrong"
      ),
    });
  }
});

app.get("/", (req, res) => {
  res.send("NexusAI Backend Running 🚀");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});