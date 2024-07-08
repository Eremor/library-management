import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { User, userActions } from 'entities/User';

interface RequestLoginProps {
  email: string;
  password: string;
}

export const requestLogin = createAsyncThunk<
  User,
  RequestLoginProps,
  ThunkConfig<string>
>(
  'login/requestLogin',
  async (loginData, thunkApi) => {
    const { dispatch, rejectWithValue, extra } = thunkApi;

    try {
      const response = await extra.api.post<User>('/auth/login', loginData);

      if (!response.data) {
        throw new Error();
      }

      dispatch(userActions.setAuthData(response.data));

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Неверная почта или пароль');
    }
  },
);
