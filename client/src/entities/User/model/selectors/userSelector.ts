import { createSelector } from '@reduxjs/toolkit';

import { StateSchema } from 'app/providers/StoreProvider';

import { UserRole } from '../const/role';

export const getAuthData = (state: StateSchema) => state.user?.authData;

export const getUserRole = (state: StateSchema) => state.user?.authData?.role;

export const isAdmin = createSelector(
  getUserRole,
  (role) => role === UserRole.ADMIN,
);
