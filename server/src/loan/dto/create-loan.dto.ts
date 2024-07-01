import { IsString } from 'class-validator';

export class CreateLoanDto {
  @IsString()
  userId: string;

  @IsString()
  bookId: string;
}
