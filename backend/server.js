// ======================
// 1. Import dependencies
// ======================
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Groq = require("groq-sdk");

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// ======================
// 2. Middleware
// ======================
app.use(cors({ origin: "*", methods: ["GET", "POST"], allowedHeaders: ["Content-Type"] }));
app.use(express.json());

// ======================
// 3. MongoDB Connection
// ======================
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed", err.message);
    process.exit(1);
  });

// ======================
// 4. MongoDB Models
// ======================
const chatSchema = new mongoose.Schema({
  messages: [
    {
      role: { type: String, enum: ["user", "assistant"], required: true },
      content: { type: String, required: true },
    }
  ]
}, { timestamps: true });

const Chat = mongoose.model("Chat", chatSchema);

// ======================
// 5. Initialize Groq
// ======================
const groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ======================
// 6. Routes
// ======================

// --- Test Route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// --- Send Message to Groq and Store Chat
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // 1. Get AI response from Groq
    const response = await groqClient.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: message }],
    });

    const botReply = response.choices[0].message.content;

    // 2. Save chat in DB (single global chat)
    let chat = await Chat.findOne();
    if (!chat) {
      chat = await Chat.create({
        messages: [
          { role: "user", content: message },
          { role: "assistant", content: botReply }
        ],
      });
    } else {
      chat.messages.push({ role: "user", content: message });
      chat.messages.push({ role: "assistant", content: botReply });
      await chat.save();
    }

    res.json({ reply: botReply });
  } catch (error) {
    console.error("Groq Error:", error);
    res.status(500).json({ error: "Failed to get response from Groq" });
  }
});

// --- Get Chat History
app.get("/api/history", async (req, res) => {
  try {
    const chat = await Chat.findOne();
    res.json({ messages: chat ? chat.messages : [] });
  } catch (error) {
    console.error("History fetch error:", error);
    res.status(500).json({ error: "Error fetching chat history" });
  }
});

// ======================
// 7. Start the server
// ======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
