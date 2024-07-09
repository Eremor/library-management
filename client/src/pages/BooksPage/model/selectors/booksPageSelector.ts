import { StateSchema } from 'app/providers/StoreProvider';

export const getBooksPageData = (state: StateSchema) => state.booksPage?.data;

export const getBooksPageIsLoading = (state: StateSchema) => state.booksPage?.isLoading;

export const getBooksPageError = (state: StateSchema) => state.booksPage?.error;
