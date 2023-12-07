// ChatMessage.js
import React, {useState} from 'react';
import Typewriter from 'typewriter-effect';
import './SystemMessage.css';

const ChatMessage = ({ username, content }) => {

  const [done, setDone] = useState(false);


  const randomClass = ['system-cursor-1', 'system-cursor-2'][Math.floor(Math.random() * 2)];

  return (
    <div className="chat-message">
      <div className="message-header">
        {/*<img src="./logo.gif" style={{height:"30px"}} />*/}
        <span className="username">Jini</span>
      </div>
      <div className="message-content">
        { (!done) ? (
          <Typewriter
            
            options={{
              strings: content,
              autoStart: false,
              loop: false,
              delay: 25,
              cursor:'●',
              cursorClassName:randomClass,
            }}

            onInit={(typewriter) => {
              typewriter.typeString(content)
                .callFunction(() => {
                  setDone(true);
                  console.log('String typed out!');

                })
                .start();
            }}
          /> 
        ):(content)}
      </div>
      </div>
  );
};

export default ChatMessage;

