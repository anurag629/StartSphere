import React, { useState } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import ChatProfiles from './ChatProfiles';

const ChatDrawer = ({ isOpen, onClose }) => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleSelectProfile = (profileId) => {
    setSelectedProfile(profileId);
  };

  return (
    <div className={`fixed bottom-0 right-0 h-3/4 w-2/3 bg-gray-800 shadow-lg transform transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex h-full">
        <ChatProfiles onSelectProfile={handleSelectProfile} />
        <div className="flex-grow flex flex-col">
          <div className="flex items-center justify-between p-4 bg-gray-900 text-white">
            <h2 className="text-lg font-bold">Messaging</h2>
            <button onClick={onClose} className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4 overflow-y-auto flex-grow bg-gray-700">
            {selectedProfile ? <ChatMessages profileId={selectedProfile} /> : <p className="text-white">Select a profile to view messages</p>}
          </div>
          <div className="p-4 border-t border-gray-600">
            {selectedProfile && <ChatInput profileId={selectedProfile} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDrawer;
