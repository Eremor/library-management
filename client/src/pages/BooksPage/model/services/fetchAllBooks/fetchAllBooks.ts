import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { Book } from 'entities/Book';

export const fetchAllBooks = createAsyncThunk<
  Book[],
  void,
  ThunkConfig<string>
>(
  'booksPage/fetchAllBooks',
  async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const response = await extra.api.get<Book[]>('/book');

      if (!response) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Не удалось получить список книг');
    }
  },
);
