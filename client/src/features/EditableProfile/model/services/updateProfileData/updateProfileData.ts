import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { Profile } from 'entities/Profile';

interface RequestData {
  profileId?: string;
  userName: string;
  email: string;
}

export const updateProfileData = createAsyncThunk<
  Profile,
  RequestData,
  ThunkConfig<string>
>(
  'profile/updateProfile',
  async (req, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    const { profileId, email, userName } = req;

    if (!profileId) {
      throw new Error();
    }

    try {
      const response = await extra.api.patch<Profile>(`/user/${profileId}`, {
        userName,
        email,
      });

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Не удалось обновить данные пользователя');
    }
  },
);
