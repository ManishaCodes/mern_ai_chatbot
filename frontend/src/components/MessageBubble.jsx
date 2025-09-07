import React from 'react';

export default function MessageBubble({ role, content }) {
  return (
    <div className={`message-bubble ${role}`}>
      <img
        src={role === 'user' ? '/avatars/user.png' : '/avatars/bot.png'}
        alt={role}
        className="avatar"
      />
      <p>{content}</p>
    </div>
  );
}
