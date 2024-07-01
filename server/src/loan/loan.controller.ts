import { Body, Controller, Post } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  async create(@Body() dto: CreateLoanDto) {
    return this.loanService.create(dto);
  }
}
