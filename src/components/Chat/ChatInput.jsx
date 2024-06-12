import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../feature/chatSlice';

const ChatInput = ({ profileId }) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        sender: 'Elon Musk',
        text: message,
        time: new Date().toLocaleString('default', { month: 'short', day: 'numeric' })
      };
      dispatch(addMessage({ profileId, message: newMessage }));
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
