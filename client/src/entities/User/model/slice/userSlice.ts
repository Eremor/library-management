import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/user';
import { UserRole } from '../const/role';

const testUser: User = {
  id: '123',
  userName: 'test',
  email: 'user@mail.ru',
  password: '123',
  role: UserRole.ADMIN,
};

const initialState: UserSchema = {
  authData: testUser,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
    },
    logout: (state) => {
      state.authData = undefined;
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
