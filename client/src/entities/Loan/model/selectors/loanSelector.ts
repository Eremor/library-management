import { StateSchema } from 'app/providers/StoreProvider';

export const getLoanData = (state: StateSchema) => state.loan?.data;

export const getLoanIsLoading = (state: StateSchema) => state.loan?.isLoading;

export const getLoanError = (state: StateSchema) => state.loan?.error;
