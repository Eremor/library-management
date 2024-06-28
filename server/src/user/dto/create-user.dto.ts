import { IsEmail, IsString, MinLength } from 'class-validator';

const MIN_LENGTH_PASSWORD = 3;

export class CreateUserDto {
  @IsString()
  userName: string;

  @IsString()
  @IsEmail(undefined, {
    message: 'Email is required',
  })
  email: string;

  @IsString()
  @MinLength(MIN_LENGTH_PASSWORD, {
    message: 'Minimum password length 3 characters',
  })
  password: string;
}
