// ChatMessage.js
import React from 'react';
// import './SystemMessage.css';

const ChatMessage = ({ username, content }) => {

  const currentTimeString = () => {
    const n = new Date();
    return `${n.getHours()}:${n.getMinutes()}:${n.getSeconds()}`
  }

  return (
    <div className="chat-message">
        <div className="message-header">
        <span className="username">Jini</span>
      </div>
      <div className="message-content"> 
        <img src="loader1.gif" />
      </div>
    </div>
  );
};

export default ChatMessage;