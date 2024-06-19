import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    socket: null,
    allChats: [],
    selectedChat: null,
    isChatOpen: false
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
        },
        resetChat: (state) => {
            state.socket = null;
            state.allChats = [];
            state.selectedChat = null;
        },
        setIsChatOpen:(state,action)=>{
          state.isChatOpen=action.payload
        }
    }
});

export const { addSocket, setAllChats, getAllChats, setSelectedChat, getSelectedChat, getChat, addChat, addMessage, addMessageToSelectedChat, resetChat,setIsChatOpen } = socketSlice.actions;
export default socketSlice.reducer;