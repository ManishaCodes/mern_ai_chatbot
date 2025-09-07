import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatHistory from "../components/ChatHistory";
import ChatWindow from "../components/ChatWindow";
import InputBar from "../components/InputBar";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeChat, setActiveChat] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch overall chat history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChatHistory(res.data.messages || []);
      } catch (err) {
        console.error("Error fetching chat history:", err);
      }
    };
    fetchHistory();
  }, [token]);

  // When a chat is selected from history
  const handleSelectChat = (index) => {
    setActiveChat(index);
    setMessages(chatHistory[index]?.messages || []);
  };

  // Sending a new message
  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const newMessage = { sender: "user", text: messageText };
    setMessages((prev) => [...prev, newMessage]);
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/chat`,
        { message: messageText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const botReply = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* LEFT: Chat History Sidebar */}
      <ChatHistory
        chatHistory={chatHistory}
        onSelectChat={handleSelectChat}
        activeChat={activeChat}
      />

      {/* RIGHT: Chat Window */}
      <div className="flex flex-col flex-1 relative">
        <ChatWindow messages={messages} loading={loading} />
        <InputBar onSend={sendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;
