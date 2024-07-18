import { BookStatus } from '../const/bookStatus';

export interface Book {
  id: string;
  title: string;
  author: string;
  publicYear: number;
  genres: string[];
  status: BookStatus;
}

export type UpdateBookData = Omit<Book, 'id' | 'status'>;
