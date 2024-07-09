import { StateSchema } from 'app/providers/StoreProvider';

export const getBookData = (state: StateSchema) => state.book?.data;

export const getBookIsLoading = (state: StateSchema) => state.book?.isLoading;

export const getBookError = (state: StateSchema) => state.book?.error;
