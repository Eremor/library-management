import { createSlice } from '@reduxjs/toolkit';
import { BookSchema } from '../types/bookSchema';

const initialState: BookSchema = {
  isLoading: false,
  data: undefined,
  error: undefined,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export const { actions: bookActions } = bookSlice;
export const { reducer: bookReducer } = bookSlice;
