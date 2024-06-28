import { IsEmail, IsString, MinLength } from 'class-validator';

const MIN_LENGTH_PASSWORD = 3;

export class LoginDto {
  @IsString()
  @IsEmail(undefined, {
    message: 'Email is required',
  })
  email: string;

  @IsString()
  @MinLength(MIN_LENGTH_PASSWORD)
  password: string;
}
