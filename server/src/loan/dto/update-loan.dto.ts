import { IsString } from 'class-validator';

export class UpdateLoanDto {
  @IsString()
  userId: string;

  @IsString()
  bookId: string;
}
