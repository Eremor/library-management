import { ReducersMapObject, combineReducers } from '@reduxjs/toolkit';

import { userReducer } from 'entities/User';

import { StateSchema } from '../types/StateSchema';

export const rootReducers = combineReducers<ReducersMapObject<StateSchema>>({
  user: userReducer,
});
