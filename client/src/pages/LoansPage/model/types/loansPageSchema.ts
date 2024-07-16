import { LoanResponse } from 'entities/Loan';

export interface LoansPageSchema {
  isLoading: boolean;
  data?: LoanResponse[];
  error?: string;
}
