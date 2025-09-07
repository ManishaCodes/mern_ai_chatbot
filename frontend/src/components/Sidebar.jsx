import React from "react";

export default function Sidebar({ chats, activeChatId, setActiveChatId, newChat }) {
  return (
    <div className="sidebar">
      <button className="new-chat-btn" onClick={newChat}>
        + New Chat
      </button>
      <div className="chat-history">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-item ${chat.id === activeChatId ? "active" : ""}`}
            onClick={() => setActiveChatId(chat.id)}
          >
            {chat.title}
          </div>
        ))}
      </div>
    </div>
  );
}
