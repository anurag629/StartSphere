import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    startups: [],
    loading: true,
    error: null,
}

const startupSlice = createSlice({
    name: 'startups',
    initialState,
    reducers: {
        addStartup: (state, action) => {
            state.loading = false;
            state.startups.push(action.payload);
        },
        updateStartup: (state, action) => {
            const updatedStartup = action.payload;
            const index = state.startups.findIndex(startup => startup._id === updatedStartup._id);
            if (index !== -1) {
                state.startups[index] = updatedStartup;
            }
        },
        deleteStartup: (state, action) => {
            const _id = action.payload;
            const updatedStartups = state.startups.filter(startup => startup._id !== _id);
            state.startups = updatedStartups;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        resetAllStartup: (state) => {
            state.startups = [];
        }
    }
});

export const { addStartup, updateStartup, deleteStartup, setError, resetAllStartup } = startupSlice.actions;
export default startupSlice.reducer;
