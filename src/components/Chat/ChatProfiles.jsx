import React from 'react';
import { useSelector } from 'react-redux';

const ChatProfiles = ({ onSelectProfile }) => {
  const profiles = useSelector(state => state.chat.profiles);

  return (
    <div className="w-1/3 bg-gray-800 p-4 border-r border-gray-600">
      <h2 className="text-lg font-bold mb-4 text-white">Profiles</h2>
      <ul>
        {profiles.map(profile => (
          <li key={profile.id} onClick={() => onSelectProfile(profile.id)} className="mb-4 cursor-pointer flex items-center hover:bg-gray-700 p-2 rounded">
            <img src={profile.image} alt={profile.name} className="w-8 h-8 rounded-full mr-2" />
            <span className="text-white">{profile.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatProfiles;
