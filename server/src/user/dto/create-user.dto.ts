import { IsString, MinLength } from 'class-validator';

const MIN_LENGTH_PASSWORD = 3;

export class CreateUserDto {
  @IsString()
  userName: string;

  @IsString()
  email: string;

  @IsString()
  @MinLength(MIN_LENGTH_PASSWORD, {
    message: 'Minimum password length 3 characters',
  })
  password: string;
}
