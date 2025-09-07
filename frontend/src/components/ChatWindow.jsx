import React, { useEffect, useRef } from "react";

const ChatWindow = ({ chat }) => {
  const chatEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="chat-window">
      {chat.map((msg, index) => (
        <div key={index} className={`chat-message ${msg.sender}`}>
          <img
            src={`/avatars/${msg.sender}.png`}
            alt={msg.sender}
            className="avatar"
          />
          <div className="message">{msg.message}</div>
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatWindow;
