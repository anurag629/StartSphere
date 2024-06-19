import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const ChatMessages = ({ selectedChat }) => {
  const profiles = useSelector(state => state.chat.profiles);
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat, selectedChat.messages]);

  return (
    <div className="chat-messages-container overflow-y-auto h-full">
      {selectedChat && selectedChat.messages && selectedChat.messages.map((msg, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center mb-1">
            <img src={msg.sender.Image} alt={msg.sender.Name} className="w-8 h-8 rounded-full" />
            <div>
              <span className="font-semibold text-white">{msg.sender.Name}</span>
              <span className="text-sm text-gray-400 ml-2">{msg.timestamp}</span>
            </div>
          </div>
          <p className="ml-10 text-white">{msg.content}</p>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
