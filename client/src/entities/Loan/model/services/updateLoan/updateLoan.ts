import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { fetchBookById } from 'entities/Book';

import { Loan, LoanResponse } from '../../types/loan';

interface UpdateLoanProps {
  userId: string,
  bookId: string
}

export const updateLoan = createAsyncThunk<
  Loan,
  UpdateLoanProps,
  ThunkConfig<string>
>(
  'loan/updateLoan',
  async ({ userId, bookId }, thunkApi) => {
    const { rejectWithValue, extra, dispatch } = thunkApi;

    try {
      if (!userId) {
        throw new Error('Авторизуйтесь что бы вернуть книгу');
      }

      const response = await extra.api.patch<LoanResponse>('/loan', { userId, bookId });

      if (!response.data) {
        throw new Error();
      }

      dispatch(fetchBookById(response.data.book.id));

      return response.data.loan;
    } catch (error) {
      console.error(error);
      return rejectWithValue(`Не удалось вернуть книгу c ID: ${bookId}`);
    }
  },
);
