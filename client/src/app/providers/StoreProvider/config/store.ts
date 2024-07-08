import { configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';

import { userReducer } from 'entities/User';

import { baseApi } from 'shared/api';

import { StateSchema, StoreWithReducerManager } from '../types/StateSchema';
import { createReducerManager } from './reducerManager';

export const createReduxStore = (asyncReducers: ReducersMapObject<StateSchema>) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<StateSchema>,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api: baseApi,
        },
      },
    }),
  });

  (store as StoreWithReducerManager).reducerManager = reducerManager;

  return (store as StoreWithReducerManager);
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
