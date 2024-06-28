import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsNumber()
  publicYear: number;

  @IsArray()
  genres: string[];
}
