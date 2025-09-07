import React from "react";

const ChatHistory = ({ chat }) => {
  // Only show first prompt of each session
  const firstPrompts = chat.filter((msg, index) => index === 0 || chat[index - 1].sender === "bot");

  return (
    <div className="chat-history">
      <h2>History</h2>
      <ul>
        {firstPrompts.map((msg, idx) => (
          <li key={idx}>{msg.message.substring(0, 30)}...</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistory;
