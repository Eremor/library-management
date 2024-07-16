import { StateSchema } from 'app/providers/StoreProvider';

export const getLoansPageData = (state: StateSchema) => state.loansPage?.data;

export const getLoansPageIsLoading = (state: StateSchema) => state.loansPage?.isLoading;

export const getLoansPageError = (state: StateSchema) => state.loansPage?.error;
