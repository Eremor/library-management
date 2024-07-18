import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { Book, UpdateBookData } from '../../types/book';

interface UpdateBookProps {
  bookId: string;
  dto: UpdateBookData
}

export const updateBook = createAsyncThunk<
  Book,
  UpdateBookProps,
  ThunkConfig<string>
>(
  'book/updateBook',
  async ({ bookId, dto }, thunkApi) => {
    const { rejectWithValue, extra } = thunkApi;

    try {
      if (!bookId) {
        throw new Error();
      }

      const response = await extra.api.patch<Book>(`/book/${bookId}`, dto);

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(`Не удалось изменить данные книги ${dto.title}`);
    }
  },
);
