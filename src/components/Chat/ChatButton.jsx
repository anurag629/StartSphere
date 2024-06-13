import React from 'react';

const ChatButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.75 5.25h14.5M4.75 12h14.5m-7.25 6.75h7.25" />
      </svg>
    </button>
  );
};

export default ChatButton;
