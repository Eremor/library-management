import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/loginSchema';
import { requestLogin } from '../services/requestLogin/requestLogin';

const initialState: LoginSchema = {
  data: undefined,
  isLoading: false,
  error: undefined,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestLogin.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(requestLogin.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(requestLogin.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
