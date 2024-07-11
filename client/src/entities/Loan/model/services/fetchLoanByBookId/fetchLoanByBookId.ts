import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { Loan } from '../../types/loan';

export const fetchLoanByBookId = createAsyncThunk<
  Loan,
  string,
  ThunkConfig<string>
>(
  'loan/fetchLoanByBookId',
  async (bookId, thunkApi) => {
    const { rejectWithValue, extra } = thunkApi;

    try {
      if (!bookId) {
        throw new Error('id книги не был передан');
      }

      const response = await extra.api.get<Loan>(`/loan/${bookId}`);

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Запись в журнале выдачи книг не найдена');
    }
  },
);
