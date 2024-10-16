import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
  loading: false,
  error: null,
  selectedBook: null,
  readingBooks: [],
  readingBooksLoading: false,
};

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    fetchBooksStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBooksSuccess: (state, action) => {
      state.loading = false;
      state.books = action.payload;
    },
    fetchBooksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedBook: (state, action) => {
      state.loading = false;
      state.selectedBook = action.payload;
    },
    setReadingBooksLoading: (state, action) => {
      state.readingBooksLoading = action.payload;
    },

    setReadingBooks: (state, action) => {
      state.readingBooks = action.payload;
    },
  },
});

export const {
  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksFailure,
  setSelectedBook,
  setReadingBooksLoading,
  setReadingBooks,
} = bookSlice.actions;

export default bookSlice.reducer;
