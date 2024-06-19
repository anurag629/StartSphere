import React, { useEffect, useState } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import ChatProfiles from './ChatProfiles';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, addMessageToSelectedChat, setAllChats, setSelectedChat } from '../../feature/socketSlice';
import api from '../../api/axios';
const ChatDrawer = ({ isOpen, onClose }) => {
  const profileData = useSelector((state) => state.profile.profile) || null;
  console.log("my profile data", profileData);
  const allChats = useSelector(state=>state.chat.allChats) || [];
  const selectedChat = useSelector(state=>state.chat.selectedChat);
  const dispatch= useDispatch();
  const newSocket = useSelector(state => state.chat.socket);
  console.log("new socket work", newSocket);

  useEffect(() => {
    if (!newSocket) return;
    const handleMessage = (message) => {
      const chatId= message.chat;
      dispatch(addMessage({chatId,message}))
      if (selectedChat && selectedChat._id === message.chat) {
        dispatch(addMessageToSelectedChat(message))
      }
    };

    newSocket.on('message', handleMessage);

    return () => {
      newSocket.off('message', handleMessage);
    };
  }, [newSocket, selectedChat]);

  const handleSelectProfile = (chatId) => {
    console.log("chat id", chatId);
    if (newSocket) {
      newSocket.emit('joinChat', { chatId });
    }
    const chat = allChats.find(chat => chat._id === chatId);
    if (chat) {
      dispatch(setSelectedChat(chat));
    }
  };

  useEffect(() => {
    const fetchAllChats = async () => {
      try {
        const response = await api.get(`/chat/myallchats/${profileData._id}`);
        
         setAllChats(response.data);
         dispatch(setAllChats(response.data))
        console.log("all chats res", response);
      } catch (error) {
        console.error('Error fetching all chats:', error);
      }
    };
    
    if (profileData && allChats && allChats.length===0) {
      fetchAllChats();
    }
  }, [profileData]);

  return (
    <div className={`fixed bottom-0 right-0 h-3/4 w-2/3 bg-gray-800 shadow-lg transform transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex h-full">
        <ChatProfiles socket={newSocket} onSelectProfile={handleSelectProfile} allChats={allChats} />
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
            {selectedChat ? <ChatMessages selectedChat={selectedChat} /> : <p className="text-white">Select a profile to view messages</p>}
          </div>
          <div className="p-4 border-t border-gray-600">
            {selectedChat && <ChatInput socket={newSocket} selectedChatId={selectedChat._id} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDrawer;
