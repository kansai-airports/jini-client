// SystemMessage.js
import React from 'react';
import './UserMessage.css';

const SystemMessage = ({ username, timestamp, content }) => {
  return (
    <div className="chat-message">
      <div className="message-header">
        <span className="username">{username}</span>
        <span className="timestamp">{timestamp}</span>
      </div>
      <div className="message-content">[SYSTEM] {content}</div>
    </div>
  );
};

export default SystemMessage;