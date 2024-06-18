import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    socket: null,
    allChats: [],
    selectedChat: null
};

const socketSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addSocket: (state, action) => {
            const newSocket = action.payload;
            state.socket = newSocket
        },
        setAllChats: (state, action) => {
            const allChats = action.payload;
            state.allChats = allChats;
        },
        getAllChats: (state) => {
            return state.allChats;
        },
        setSelectedChat: (state, action) => {
            const selectedChat = action.payload;
            state.selectedChat = selectedChat;
        },
        getSelectedChat: (state) => {
            return state.selectedChat;
        },
        getChat: (state, action) => {
            const chatId = action.payload;
            return state.allChats.find(chat => chat._id === chatId);
        },
        addChat: (state, action) => {
            const newChat = action.payload;
            state.allChats.unshift(newChat);
        },
        addMessage: (state, action) => {
          const { chatId, message } = action.payload;
          const chat = state.allChats.find(chat => chat._id === chatId);
          chat.messages.push(message);
      },
      addMessageToSelectedChat: (state, action) => {
        const message = action.payload;
        state.selectedChat.messages.push(message);
    }
        
    }
});

export const { addSocket,setAllChats,getAllChats,setSelectedChat,getSelectedChat,getChat,addChat,addMessage,addMessageToSelectedChat} = socketSlice.actions;
export default socketSlice.reducer;