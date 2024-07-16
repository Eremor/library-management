import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { LoanResponse } from 'entities/Loan';

export const fetchAllLoans = createAsyncThunk<
  LoanResponse[],
  void,
  ThunkConfig<string>
>(
  'loansPage/fetchAllLoans',
  async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const response = await extra.api.get<LoanResponse[]>('/loan');

      if (!response) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Не удалось получить список арендованных книг');
    }
  },
);
