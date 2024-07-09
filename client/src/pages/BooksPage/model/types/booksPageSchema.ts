import { Book } from 'entities/Book';

export interface BooksPageSchema {
  isLoading: boolean;
  data?: Book[];
  error?: string;
}
