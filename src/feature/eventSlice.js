import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    events: null,
    loading: true,
    error: null,
}

const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        addEvent: (state, action) => {
            state.loading = false
            state.events.unshift(action.payload);
        },
        updateEvent: (state, action) => {
            const updatedEvent = action.payload
            const index = state.events.findIndex(event => event._id === updatedEvent._id);
            if (index !== -1) {
                state.events[index] = updatedEvent;
            }
        },
        deleteEvent: (state, action) => {
            const _id = action.payload;
            const updatedEvent = state.events.filter(event => event._id !== _id);
            state.events = updatedEvent
        },
        resetAllEvent: (state) => {
            state.events = null;
        },
        setEvent: (state, action) => {
            state.loading = false
            state.events = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const { addEvent, updateEvent, deleteEvent, resetAllEvent, setEvent, setError } = eventSlice.actions
export default eventSlice.reducer
