import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginData = (state: StateSchema) => state.login?.data;

export const getLoginIsLoading = (state: StateSchema) => state.login?.isLoading;

export const getLoginError = (state: StateSchema) => state.login?.error;
