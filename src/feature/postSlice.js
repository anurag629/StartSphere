import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    loading: true,
    error: null,
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.loading = false
            // state.posts.push(action.payload);
            state.posts.unshift(action.payload);
        },
        updatePost: (state, action) => {
            const updatedPost = action.payload
            const index = state.posts.findIndex(post => post._id === updatedPost._id);
            if (index !== -1) {
                state.posts[index] = updatedPost;
            }
        },
        deletePost: (state, action) => {
            const _id = action.payload;
            const updatedPost = state.posts.filter(post => post._id !== _id);
            state.posts = updatedPost
        },
        resetAllPost: (state) => {
            state.posts = [];
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const { addPost, updatePost, deletePost, resetAllPost, setError } = postSlice.actions
export default postSlice.reducer
