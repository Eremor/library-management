import { Book } from './book';

export interface BookSchema {
  isLoading: boolean;
  data?: Book;
  error?: string;
}
