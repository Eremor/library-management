import { ReactNode, useEffect } from 'react';
import { useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';

import { StateSchema, StateSchemaKey, StoreWithReducerManager } from 'app/providers/StoreProvider';

import { useAppDispatch } from 'shared/lib/hooks';

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>
}

interface DynamicModuleLoaderProps {
  children: ReactNode;
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
}

function DynamicModuleLoader(props: DynamicModuleLoaderProps) {
  const {
    children,
    reducers,
    removeAfterUnmount = true,
  } = props;

  const store = useStore() as StoreWithReducerManager;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers();
    Object
      .entries(reducers)
      .forEach(([name, reducer]) => {
        const mounted = mountedReducers[name as StateSchemaKey];
        if (!mounted) {
          store.reducerManager.add(name as StateSchemaKey, reducer);
          dispatch({ type: `@INIT ${name} reducer` });
        }
      });

    return () => {
      if (removeAfterUnmount) {
        Object
          .keys(reducers)
          .forEach((name) => {
            store.reducerManager.remove(name as StateSchemaKey);
            dispatch({ type: `@REMOVE ${name} reducer` });
          });
      }
    };
  }, []);

  return (
    <>
      { children }
    </>
  );
}

export { DynamicModuleLoader };
