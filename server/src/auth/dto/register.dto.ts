import { IsPasswordMatchingConstraint } from '@auth/decorators';
import { IsString, MinLength, Validate } from 'class-validator';

const MIN_LENGTH_PASSWORD = 3;

export class RegisterDto {
  @IsString()
  userName: string;

  @IsString()
  email: string;

  @IsString()
  @MinLength(MIN_LENGTH_PASSWORD, {
    message: 'Minimum password length 3 characters',
  })
  password: string;

  @IsString()
  @MinLength(MIN_LENGTH_PASSWORD, {
    message: 'Minimum password length 3 characters',
  })
  @Validate(IsPasswordMatchingConstraint, {
    message: 'Passwords do not match',
  })
  passwordRepeat: string;
}
