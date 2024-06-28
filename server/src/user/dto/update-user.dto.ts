import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  userName: string;

  @IsOptional()
  @IsString()
  @IsEmail(undefined, {
    message: 'Email is required',
  })
  email: string;
}
