import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoanSchema } from '../types/loanSchema';
import { Loan } from '../types/loan';
import { fetchLoanByBookId } from '../services/fetchLoanByBookId/fetchLoanByBookId';
import { updateLoan } from '../services/updateLoan/updateLoan';

const initialState: LoanSchema = {
  isLoading: false,
  data: undefined,
  error: undefined,
};

const loanSlice = createSlice({
  name: 'loan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoanByBookId.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchLoanByBookId.fulfilled, (state, action: PayloadAction<Loan | undefined>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchLoanByBookId.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateLoan.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(updateLoan.fulfilled, (state, action: PayloadAction<Loan>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateLoan.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: loanActions } = loanSlice;
export const { reducer: loanReducer } = loanSlice;
