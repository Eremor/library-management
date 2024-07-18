import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BookSchema } from '../types/bookSchema';
import { Book } from '../types/book';

import { fetchBookById } from '../services/fetchBookById/fetchBookById';
import { updateBook } from '../services/updateBook/updateBook';

const initialState: BookSchema = {
  isLoading: false,
  data: undefined,
  error: undefined,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookById.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchBookById.fulfilled, (state, action: PayloadAction<Book>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateBook.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(updateBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateBook.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: bookActions } = bookSlice;
export const { reducer: bookReducer } = bookSlice;
