import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { Book } from '../../types/book';

export const fetchBookById = createAsyncThunk<
  Book,
  string | undefined,
  ThunkConfig<string>
>(
  'book/fetchBookById',
  async (bookId, thunkApi) => {
    const { rejectWithValue, extra } = thunkApi;

    try {
      if (!bookId) {
        throw new Error();
      }

      const response = await extra.api.get<Book>(`/book/${bookId}`);

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Книга не найдена');
    }
  },
);
