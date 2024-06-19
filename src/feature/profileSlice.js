import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: null,
    loading: true,
    error: null,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.loading = false
            state.profile = action.payload;
        },
        updateProfile: (state, action) => {
            const updatedProfile = action.payload
            state.profile = updatedProfile;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        resetProfile: (state) => {
            state.profile = null;
        }
    }
})

export const { setProfile, updateProfile, setError, resetProfile } = profileSlice.actions
export default profileSlice.reducer