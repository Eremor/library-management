import { Book } from 'entities/Book';
import { User } from 'entities/User';

export interface Loan {
  id: string;
  bookId: string;
  userId: string;
  giveDate: Date;
  returnDate: Date;
  active: boolean;
}

export interface LoanResponse {
  loan: Loan;
  user: Pick<User, 'id' | 'userName'>;
  book: Pick<Book, 'id' | 'title'>;
}
