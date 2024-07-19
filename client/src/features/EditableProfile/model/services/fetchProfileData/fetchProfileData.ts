import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { Profile } from 'entities/Profile';

export const fetchProfileData = createAsyncThunk<
  Profile,
  string,
  ThunkConfig<string>
>(
  'profile/fetchProfile',
  async (userId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const responses = await extra.api.get<Profile>(`/user/${userId}`);

      if (!responses.data) {
        throw new Error();
      }

      return responses.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Не удалось получить профиль пользователя');
    }
  },
);
