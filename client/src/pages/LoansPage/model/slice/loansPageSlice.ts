import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoanResponse } from 'entities/Loan';

import { LoansPageSchema } from '../types/loansPageSchema';
import { fetchAllLoans } from '../services/fetchAllLoans/fetchAllLoans';

const initialState: LoansPageSchema = {
  isLoading: false,
  data: undefined,
  error: undefined,
};

const loansPageSlice = createSlice({
  name: 'loansPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLoans.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchAllLoans.fulfilled, (state, action: PayloadAction<LoanResponse[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllLoans.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: loansPageActions } = loansPageSlice;
export const { reducer: loansPageReducer } = loansPageSlice;
