import {
  EnhancedStore, Reducer, ReducersMapObject, StoreEnhancer, ThunkDispatch, Tuple, UnknownAction,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { BookSchema } from 'entities/Book';
import { LoanSchema } from 'entities/Loan';
import { UserSchema } from 'entities/User';

import { LoginSchema } from 'features/LoginUser';

import { BooksPageSchema } from 'pages/BooksPage';

export interface StateSchema {
  user: UserSchema;
  login?: LoginSchema;
  book?: BookSchema;
  booksPage?: BooksPageSchema;
  loan?: LoanSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (
    state: StateSchema,
    action: UnknownAction
  ) => StateSchema;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  getMountedReducers: () => MountedReducers;
}

// export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
//   reducerManager: ReducerManager;
// }

export interface ThunkExtraArg {
  api: AxiosInstance
}

export interface ThunkConfig<T> {
  extra: ThunkExtraArg;
  state: StateSchema;
  rejectValue: T;
}

type StoreType = EnhancedStore<
  StateSchema,
  UnknownAction,
  Tuple<[
    StoreEnhancer<{
      dispatch: ThunkDispatch<
        StateSchema, {
          api: AxiosInstance;
        },
        UnknownAction
      >;
    }>,
    StoreEnhancer
  ]>
>

export interface StoreWithReducerManager extends StoreType {
  reducerManager: ReducerManager;
}
