import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from 'shared/api';
import { rootReducers } from './rootReducer';

export const store = configureStore({
  reducer: rootReducers,
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: {
        api: baseApi,
      },
    },
  }),
});

export type AppDispatch = typeof store.dispatch;
