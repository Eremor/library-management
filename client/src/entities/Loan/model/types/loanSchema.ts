import { Loan } from './loan';

export interface LoanSchema {
  isLoading: boolean;
  data?: Loan;
  error?: string;
}
