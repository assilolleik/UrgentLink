import React, { useState } from 'react';
import axios from 'axios';

import './chatcomp.css';

const Chatcomp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    // User message
    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    try {
      // Send user message to Flask back-end for classification
      const response = await axios.post('http://localhost:5000/classify', {
        content: input,
      });

      const botReply = generateBotReply(response, input);

      // Simulate bot reply with a delay
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botReply]);
      }, 100);
    } catch (error) {
      console.error('Error communicating with the back-end:', error);
    }
  };

  const generateBotReply = (response, userInput) => {
    const lowerCaseInput = userInput.toLowerCase();

    // Sample replies
    const sampleReplies = {
      'hello': 'Hello Patient! How can I assist you?',
      'hi': 'Hello Patient ! How can I help you today?',
      'goodbye': 'Goodbye! Hope you get well soon !',
      'bye': 'Bye! Hope you get well soon !',
      'i am not feeling well': 'Sad to hear this, provide me with your case to help you further!',
    };

    // Check if the user input matches a predefined reply
    const predefinedReply = sampleReplies[lowerCaseInput];
    if (predefinedReply) {
    return { text: predefinedReply, sender: 'bot' };
  }

    // If no predefined reply, use the classification result
    const botReplyText = `From the input you provided me, I suggest that you visit the ${response.data.result} department directly! Hope you and your beloved get well soon.`;
    return { text: botReplyText, sender: 'bot' };
  };

  const handleSendClick = () => {
    handleSendMessage();
  };

  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleEnterPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSendClick}>
          <span role="img" aria-label="send">
            ➡️
          </span>
        </button>
      </div>
    </div>
  );
};

export default Chatcomp;
