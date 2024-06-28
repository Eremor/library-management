import { Status } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsNumber()
  @IsOptional()
  publicYear: number;

  @IsArray()
  @IsOptional()
  genres: string[];

  @IsEnum(Status, {
    message: 'status can be either AVAILABLE or ISSUED',
  })
  @IsOptional()
  status: Status;
}
