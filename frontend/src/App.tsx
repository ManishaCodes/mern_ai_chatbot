import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import "./App.css";

const App: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMsg = { role: "user", content: message };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      const botMsg = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <ChatWindow messages={messages} onSend={sendMessage} />
    </div>
  );
};

export default App;
