import React from 'react';
import { useSelector } from 'react-redux';

const ChatProfiles = ({ onSelectProfile, allChats }) => {
  const profileData = useSelector((state) => state.profile.profile) || null;
  const selectedChat = useSelector(state=>state.chat.selectedChat);
  console.log("all chats", allChats);
  return (
    <div className="w-1/3 bg-gray-800 p-4 border-r border-gray-600 flex flex-col">
      <h2 className="text-lg font-bold mb-4 text-white">Profiles</h2>
      <ul className="flex-grow overflow-y-scroll">
        {allChats && allChats.map(chat => (
            <li key={chat._id} onClick={() => onSelectProfile(chat._id)} className={`mb-4 cursor-pointer flex items-center hover:bg-gray-700 p-2 rounded ${
               selectedChat && selectedChat._id === chat._id ? 'bg-gray-600' : 'hover:bg-gray-700'
            }`}>
            <img src={chat.participants[0]._id === profileData._id ? chat.participants[1].Image : chat.participants[0].Image} className="w-8 h-8 rounded-full mr-2" alt="profile" />
            <span className="text-white">{chat.participants[0]._id === profileData._id ? chat.participants[1].Name : chat.participants[0].Name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatProfiles;
