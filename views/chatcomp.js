// src/Chat.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import './chatcomp.css'; // Import the external CSS file for styling
const Chatcomp = () => {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    // User message
    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    // Simulate bot reply with a delay (you can replace this with your actual chatbot logic)
    setTimeout(() => {
      const botReply = generateBotReply(input); // Function to generate a sample bot reply
      setMessages((prevMessages) => [...prevMessages, botReply]);
    }, 100);
  };


  // Function to generate a sample bot reply based on user input
  const generateBotReply = (userInput) => {
    const sampleReplies = {
      'hello': 'Hi there! How can I assist you?',
      'how are you': 'I am just a bot, but thanks for asking!',
      'bye': 'Goodbye! Have a great day.',
      // Add more sample replies as needed based on different user inputs
    
      // General and longer patient queries and department recommendations
      ' i broke my leg while playing football, what should i do':
        'For joint pain and related concerns, it would be best to consult with the Orthopedics department for a comprehensive evaluation.',
      'recently ive noticed changes in my vision such as blurriness and difficulty focusing where should i go for help':
        'Vision-related issues are often addressed by specialists in the Ophthalmology department. Consider scheduling an appointment with them for a detailed examination.',
      'over the past few weeks ive been feeling unusually fatigued and have difficulty concentrating what could be causing this':
        'Persistent fatigue and concentration issues may require attention from specialists in the Hematology - Oncology department. It is advisable to consult with them for further evaluation.',
      ' i am expecting a baby and want to ensure a healthy pregnancy where should i seek prenatal care and guidance':
        'Congratulations on your pregnancy! For prenatal care and guidance, it is recommended to visit the Obstetrics / Gynecology department, where they specialize in womens reproductive health.',
      'lately ive been struggling with overwhelming feelings of anxiety and stress what options are available for mental health support':
        'Mental health concerns, including anxiety and stress, can be addressed by professionals in the Psychiatry / Psychology department. Consider reaching out to them for support and guidance.',
      ' i have been having trouble breathing and occasional chest pain what could be the cause and where should i go for evaluation':
        'Symptoms like difficulty breathing and chest pain may indicate issues related to the Cardiovascular / Pulmonary system. It is crucial to seek assessment from specialists in that department.',
      ' i have noticed persistent skin issues like rashes and itching what could be the possible causes and which department should i consult':
        'Skin-related concerns such as rashes and itching fall under the expertise of Dermatology. Consider making an appointment with Dermatologists for a thorough examination and diagnosis.',
      ' i have been diagnosed with diabetes and im looking for guidance on managing my condition where should i go for diabetes care':
        'For comprehensive care and guidance on managing diabetes, it is recommended to consult with specialists in the Endocrinology department. They can provide tailored advice based on your specific needs.',
      ' i have been having persistent issues with my ears including hearing loss and discomfort where should i go for an ear-related examination':
        'Ear-related concerns, including hearing loss and discomfort, should be addressed by specialists in the ENT - Otolaryngology department. Schedule an appointment with them for a detailed examination.',
      'i frequently experience stomach pain and digestive issues what could be the underlying causes and which department can help me with gastrointestinal concerns':
        'Persistent stomach pain and digestive issues may require evaluation by specialists in the Gastroenterology department. They can conduct necessary tests and provide appropriate guidance for your condition.',
      ' i have been diagnosed with a blood disorder and need ongoing care where should i go for treatment and management of hematological conditions':
        'For ongoing care and treatment of blood disorders, it is recommended to seek the expertise of specialists in the Hematology - Oncology department. They can provide the necessary care and management.',
      ' i am experiencing frequent headaches and occasional dizziness what could be the reasons and where should i go for a neurological evaluation':
        'Frequent headaches and dizziness may warrant a neurological evaluation. Consult with specialists in the Neurology department for a thorough examination and appropriate recommendations.',
      ' i am looking for guidance on orthopedic issues particularly related to bones and joints where should i go for orthopedic care and consultation':
        'For orthopedic concerns related to bones and joints, it is recommended to seek consultation and care from specialists in the Orthopedics department. They can provide expertise in managing musculoskeletal conditions.',
      ' i am experiencing issues with my urinary system and would like to get it checked where should i go for urological evaluation and care':
        'For issues related to the urinary system, including urinary tract problems, it is advisable to consult with specialists in the Urology department. They can conduct necessary examinations and provide appropriate care.',
      'my child has been unwell and im seeking medical attention for pediatric care where should i go for pediatric consultation and treatment':
        'For pediatric care and treatment for children, it is recommended to visit specialists in the Pediatrics department. They can provide specialized care tailored to the unique needs of children.',
      'i recently sustained an injury and require medical attention where should i go for immediate assistance and treatment':
        'For immediate medical attention and treatment of injuries, it is recommended to visit the Surgery department, depending on the nature and severity of the injury.',
      'i need to undergo diagnostic imaging for a health concern where should i go for radiological examinations and tests':
        'For diagnostic imaging services, including X-rays and other radiological examinations, it is recommended to visit the Radiology department. They can perform the necessary tests and provide imaging-related services.',
      // Add more patient queries and department recommendations as needed
    };
    
    const lowerCaseInput = userInput.toLowerCase();
    const botReplyText = sampleReplies[lowerCaseInput] || 'I recieved your input, I will reply to you when my model is fully trained and tested, Go to the ER practitioner for your request: { ' 
    +lowerCaseInput +' }';
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
