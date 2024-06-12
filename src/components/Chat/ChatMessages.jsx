import React from 'react';
import { useSelector } from 'react-redux';

const ChatMessages = ({ profileId }) => {
  const messages = useSelector(state => state.chat.messages?.[profileId] || []);
  const profiles = useSelector(state => state.chat.profiles);
  console.log(profiles);
  console.log(messages);
  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center mb-1">
            <img src={profiles[index]?.image} alt={profiles[msg?.sender]?.name} className="w-8 h-8 rounded-full" />
            <div>
              <span className="font-semibold text-white">{msg.sender}</span>
              <span className="text-sm text-gray-400 ml-2">{msg.time}</span>
            </div>
          </div>
          <p className="ml-10 text-white">{msg.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
