import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUser } from '@fortawesome/free-solid-svg-icons';
import UserMessage from './components/UserMessage';
import SystemMessage from './components/SystemMessage';
import LoadingMessage from './components/LoadingMessage';
import BotMessage from './components/BotMessage';
import { predict } from './helpers/llm'
import {ERROR} from './helpers/const'

import './App.css';

const lang = 'en';
const msg = {
  main:{
    en:'How can i help you?',
    jp:'お手伝い致します',
  },
  llm_error:{
    en: 'An error occured in the LLM engine. Please contact your IT Service Desk or try again later',
    jp: 'エラー'
  }
}
// const msg_main = '何か手伝いましょうか？';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [btnActive, setBtnActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('Pascal Portalier');
  const inputRef = useRef();
  const messagesEndRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

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


    const result = await predict(_input);
    const response = ERROR.isFatal(result.error) ? msg.llm_error[lang] : result.payload;
    const kind = ERROR.isFatal(result.error) ? 'system' : 'bot';
    console.log(result);

    setMessages((prevMessages) => [
      ...prevMessages.slice(0, -1),
      { text: response, kind: kind },
    ]);
    setIsLoading(false);
    // scrollToBottom();

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
          <div className="logo-container ">
            { messages.length > 0 ? <span className="anim-left"><img className="main-logo" src="logo.gif" alt="Logo" /></span> : null }
            <div className="title">Jini</div>
          </div>
          {/*<img src="logo.gif" className="main-logo" />jini </div>*/}
          <div className="logo-container">
            <div className="main-username"> <FontAwesomeIcon icon={faUser} className="user-icon"/>{username}</div>
          </div>
      </div>
      <div className="chat-container">
        <div className="chat-messages" ref={inputRef}>
          {messages.length === 0 ? (

            <div className="empty-chat anim-appear">
              <div className="plane-logo">
              <img
                src="logo.gif"
                alt="plane-logo"
              /></div>
              <div style={{color:'#0c2a4d'}}>{msg.main[lang]}</div>
            </div>
          ) : (
            messages.map((message, index) => (
              message.kind == 'user' ? 
                <UserMessage key={index} username={username} timestamp={message.timestamp} content={message.text} /> 
              : message.kind == 'bot' ?
                <BotMessage key={index} content={message.text} />
              : message.kind == 'system' ?
                <SystemMessage key={index} content={message.text} />
              : message.kind == 'loading' ?
                <LoadingMessage key={index}/>
              : null

            ))
          )}
          <div ref={messagesEndRef}></div>
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

export default App;
