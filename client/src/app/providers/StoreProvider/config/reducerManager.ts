import {
  combineReducers, Reducer, ReducersMapObject, UnknownAction,
} from '@reduxjs/toolkit';

import {
  MountedReducers, ReducerManager, StateSchema, StateSchemaKey,
} from '../types/StateSchema';

export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager {
  const reducers = { ...initialReducers };

  let combinedReducer = combineReducers(reducers);

  let keysToRemove: StateSchemaKey[] = [];

  const mountedReducers: MountedReducers = {};

  return {
    getReducerMap: () => reducers,
    reduce: (state: StateSchema, action: UnknownAction) => {
      if (keysToRemove.length > 0) {
        state = { ...state };
        for (const key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = [];
      }

      return combinedReducer(state, action);
    },
    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }
      reducers[key] = reducer;
      combinedReducer = combineReducers(reducers);
    },
    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) {
        return;
      }
      delete reducers[key];
      keysToRemove.push(key);
      combinedReducer = combineReducers(reducers);
    },
    getMountedReducers: () => mountedReducers,
  };
}
