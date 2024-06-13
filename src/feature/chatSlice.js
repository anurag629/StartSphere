import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profiles: [
    { id: 1, name: 'Narendra Modi', image: '../images/dummy/modi.png' },
    { id: 2, name: 'Elon Musk', image: '../images/dummy/elon.png' },
    { id: 3, name: 'Meloni', image: '../images/dummy/modi.png' },
  ],
  messages: {
    1: [
      { sender: 'Narendra Modi', text: 'You had a nice chat with you!', time: '8:00 PM Jun 8, 2024' },
      { sender: 'Anurag Verma', text: 'Okay. Had a nice chat with you!', time: '8:00 PM Jun 8, 2024' }
    ],
    2: [
      { sender: 'Anurag Verma', text: 'Hello!', time: '9:00 AM Jun 8, 2024' },
      { sender: 'Elon Must', text: 'Hi there!', time: '9:01 AM Jun 8, 2024' },
      { sender: 'Anurag Verma', text: 'How are you?', time: '9:02 AM Jun 8, 2024' },
      { sender: 'Elon Must', text: 'I am good. How are you?', time: '9:03 AM Jun 8, 2024' },

    ],
    3: [
      { sender: 'Anurag Verma', text: 'Hello!', time: '9:00 AM Jun 8, 2024' },
      { sender: 'Meloni', text: 'Hi there!', time: '9:01 AM Jun 8, 2024' },
      { sender: 'Anurag Verma', text: 'How are you?', time: '9:02 AM Jun 8, 2024' },
      { sender: 'Meloni', text: 'I am good. How are you?', time: '9:03 AM Jun 8, 2024' },
    ]
  },
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { profileId, message } = action.payload;
      if (!state.messages[profileId]) {
        state.messages[profileId] = [];
      }
      state.messages[profileId].push(message);
    }
  }
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
