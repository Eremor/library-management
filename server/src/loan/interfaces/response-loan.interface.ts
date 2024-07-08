import { Book, Loan } from '@prisma/client';
import { UserResponse } from '@user/responses';

export interface ResponseLoan {
  loan: Loan;
  user: DeepPartial<UserResponse>;
  book: DeepPartial<Book>;
}
