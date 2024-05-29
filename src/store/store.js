import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../feature/authSlice'
import postSlice from '../feature/postSlice'
import profileSlice from '../feature/profileSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        posts: postSlice,
        profile: profileSlice
    }
})
export default store