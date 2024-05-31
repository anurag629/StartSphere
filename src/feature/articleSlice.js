import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    articles: [],
    loading: true,
    error: null,
}

const articleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        addArticle: (state, action) => {
            state.loading = false
            state.articles.push(action.payload);
        },
        updateArticle: (state, action) => {
            const updatedArticle = action.payload
            const index = state.articles.findIndex(article => article._id === updatedArticle._id);
            if (index !== -1) {
                state.articles[index] = updatedArticle;
            }
        },
        deleteArticle: (state, action) => {
            const _id = action.payload;
            const updatedArticles = state.articles.filter(article => article._id !== _id);
            state.articles = updatedArticles;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const { addArticle, updateArticle, deleteArticle, setError } = articleSlice.actions
export default articleSlice.reducer
