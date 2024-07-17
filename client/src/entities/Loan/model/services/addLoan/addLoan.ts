import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { fetchBookById } from 'entities/Book';

import { Loan, LoanResponse } from '../../types/loan';

interface AddLoanProps {
  userId: string;
  bookId: string;
}

export const addLoan = createAsyncThunk<
  Loan,
  AddLoanProps,
  ThunkConfig<string>
>(
  'loan/addLoan',
  async ({ userId, bookId }, thunkApi) => {
    const { rejectWithValue, extra, dispatch } = thunkApi;

    try {
      if (!userId) {
        throw new Error('Авторизуйтесь что бы арендовать книгу');
      }

      const response = await extra.api.post<LoanResponse>('/loan', { userId, bookId });

      if (!response.data) {
        throw new Error();
      }

      dispatch(fetchBookById(response.data.book.id));

      return response.data.loan;
    } catch (error) {
      console.error(error);
      return rejectWithValue(`Не удалось арендобать книгу с ID: ${bookId}`);
    }
  },
);
