export interface Loan {
  id: string;
  bookId: string;
  userId: string;
  giveDate: Date;
  returnDate: Date;
  active: boolean;
}
