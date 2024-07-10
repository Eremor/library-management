import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from 'entities/Book';
import { BooksPageSchema } from '../types/booksPageSchema';
import { fetchAllBooks } from '../services/fetchAllBooks/fetchAllBooks';
import { createNewBook } from '../services/createNewBook/createNewBook';

const initialState: BooksPageSchema = {
  isLoading: false,
  data: undefined,
  error: undefined,
};

const booksPageSlice = createSlice({
  name: 'booksPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBooks.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchAllBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllBooks.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createNewBook.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(createNewBook.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createNewBook.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: booksPageActions } = booksPageSlice;
export const { reducer: booksPageReducer } = booksPageSlice;
