import { UserRole } from '../const/role';

export interface User {
  id: string;
  userName: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UserSchema {
  authData?: User;
}
