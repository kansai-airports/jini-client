// ChatMessage.js
import React from 'react';
import './UserMessage.css';


const ChatMessage = ({ username, timestamp, content }) => {
  return (
    <div className="chat-message">
      <div className="message-header">
        <span className="username">{username}</span>
        <span className="timestamp">{timestamp}</span>
      </div>
      <div className="message-content">{content}</div>
    </div>
  );
};

export default ChatMessage;