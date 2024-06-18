
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ChatMessages = ({ selectedChat}) => {
  const profiles = useSelector(state => state.chat.profiles);

  console.log("selectedChat",selectedChat)
  useEffect(()=>{
   
  },[selectedChat])
  return (
    <div>
      {selectedChat &&  selectedChat.messages &&  selectedChat.messages.map((msg, index) => (
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
    </div>
  );
};

export default ChatMessages;
