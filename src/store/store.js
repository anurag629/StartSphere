import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../feature/authSlice'
import postSlice from '../feature/postSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        posts: postSlice,
    }
})
export default store