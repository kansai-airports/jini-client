import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import UserMessage from './components/UserMessage';
import SystemMessage from './components/SystemMessage';
import LoadingMessage from './components/LoadingMessage';
import { predict } from './helpers/llm'

import './App.css';

const msg_main = 'お手伝い致します';
// const msg_main = '何か手伝いましょうか？';

const ChatGPTChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [btnActive, setBtnActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('Pascal');
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [messages]);


  const currentTimeString = () => {
    const now = new Date();
    const h = now.getHours().toString().padStart(2,'0');
    const m = now.getMinutes().toString().padStart(2,'0');
    const s = now.getSeconds().toString().padStart(2,'0');
    return `${h}:${m}:${s}`;
  }

  const handleSendMessage = async () => {
    if (input.trim() === '' || !btnActive || isLoading ) return;
    
    const _input = input;
    setInput('');
    setBtnActive(false);
    setIsLoading(true);

    setMessages([
      ...messages,
      { text: input, kind:'user', timestamp: currentTimeString()},
      { text: 'Loading...', kind:'loading' },
    ]);


    const result = await predict();

    console.log('result');
    console.log(result);
    // Simulate GPT response delay (replace with actual API call)
    // setTimeout(() => {
    //   const gptResponse = 'This is a sample response from ChatGPT.';
    //   setMessages((prevMessages) => [
    //     ...prevMessages.slice(0, -1),
    //     { text: gptResponse, kind:'system' },
    //   ]);
    //   setIsLoading(false);
    // }, 3000);
  };

  const handleInputChange = (e) => {
    setBtnActive(e.target.value.length > 0);
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="page-title">
          <div className="logo-container">
            { messages.length > 0 ? <img className="main-logo anim-left" src="logo.gif" alt="Logo" /> : null }
            <div className="title">Jini</div>
          </div>
          {/*<img src="logo.gif" className="main-logo" />jini </div>*/}
          <div> {username} </div>
      </div>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.length === 0 ? (

            <div className="empty-chat anim-appear">
              <div className="plane-logo">
              <img
                src="logo.gif"
                alt="plane-logo"
              /></div>
              <div style={{color:'#0c2a4d'}}>{msg_main}</div>
            </div>
          ) : (
            messages.map((message, index) => (
              message.kind == 'user' ? 
                <UserMessage key={index} username={username} timestamp={message.timestamp} content={message.text} /> 
              : message.kind == 'system' ? 
                <SystemMessage key={index} content={message.text} /> 
              : <LoadingMessage key={index}/>

            ))
          )}
        </div>
        <div className="chat-input-ctn">
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              ref={inputRef}
            />
            <button 
              onClick={handleSendMessage}
              className={`${btnActive&&!isLoading ? 'active' : 'not-active'}`}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatGPTChat;
