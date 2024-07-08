import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto, UpdateLoanDto } from './dto';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  async create(@Body() dto: CreateLoanDto) {
    return this.loanService.create(dto);
  }

  @Get()
  async findAll() {
    return this.loanService.findAll();
  }

  @Get(':id')
  async findOneByBookId(@Param('id') bookId: string) {
    return this.loanService.findOneByBookId(bookId);
  }

  @Patch()
  async update(@Body() dto: UpdateLoanDto) {
    return this.loanService.update(dto);
  }
}
