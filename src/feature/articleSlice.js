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
        setArticle: (state, action) => {
            state.articles = action.payload;
            state.loading = false;
        },
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
        resetAllArticle: (state) => {
            state.articles = [];
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const { setArticle, addArticle, updateArticle, deleteArticle, resetAllArticle, setError } = articleSlice.actions
export default articleSlice.reducer
