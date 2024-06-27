import { Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserResponse implements User {
  id: string;
  userName: string;
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  createdAt: Date;

  role: Role;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
