import { User } from 'entities/User';

export interface LoginSchema {
  isLoading: boolean;
  data?: User;
  error?: string;
}
