import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ChatInput = ({ socket,selectedChatId }) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profile.profile) || null;
  const handleSend = () => {
    if (message.trim()) {
      socket.emit('sendMessage', {
        chatId: selectedChatId,
        senderId: profileData._id,
        content: message
      });
      setMessage('');
    }
  };
  return (
    <div className="flex items-center">
      <input 
        type="text" 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        placeholder="Write a message..."
      />
      <button 
        onClick={handleSend} 
        className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 focus:outline-none"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
