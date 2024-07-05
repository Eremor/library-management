import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ReducersMapObject } from '@reduxjs/toolkit';

import { StateSchema } from '../types/StateSchema';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
  children: ReactNode;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

function StoreProvider({ children, asyncReducers }: StoreProviderProps) {
  const store = createReduxStore(asyncReducers as ReducersMapObject<StateSchema>);
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export { StoreProvider };
