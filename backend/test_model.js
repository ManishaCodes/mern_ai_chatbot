require("dotenv").config();
const { Groq } = require("groq-sdk");

async function runTest() {
  try {
    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant", // ✅ use this working model
      messages: [{ role: "user", content: "Hello Groq! Tell me a short joke." }],
    });

    console.log("Groq Reply:", completion.choices[0].message.content);
  } catch (error) {
    console.error("Error testing Groq:", error);
  }
}

runTest();
