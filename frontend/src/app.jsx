import React, { useState, useEffect } from "react";
import ChatHistory from "./components/ChatHistory";
import ChatWindow from "./components/ChatWindow";
import InputBar from "./components/InputBar";
import axios from "axios";
import "./App.css";

const App = () => {
  const [chat, setChat] = useState([]);
  const [theme, setTheme] = useState("dark");

  // Sounds
  const sendSound = new Audio("/sounds/send.mp3");
  const receiveSound = new Audio("/sounds/receive.mp3");

  // Send message
  const handleSend = async (message) => {
    if (!message.trim()) return;
    sendSound.play();
    setChat((prev) => [...prev, { sender: "user", message }]);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", { message });
      const botMsg = { sender: "bot", message: res.data.reply };
      receiveSound.play();
      setChat((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setChat((prev) => [...prev, { sender: "bot", message: "Something went wrong..." }]);
    }
  };

  // Toggle theme
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  // Apply theme class to body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="app">
      <ChatHistory chat={chat} />
      <div className="chat-container">
        <ChatWindow chat={chat} />
        <InputBar onSend={handleSend} />
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default App;
