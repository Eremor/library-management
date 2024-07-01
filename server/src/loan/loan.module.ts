import { Module } from '@nestjs/common';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { UserModule } from '@user/user.module';
import { BookModule } from '@book/book.module';

@Module({
  imports: [UserModule, BookModule],
  controllers: [LoanController],
  providers: [LoanService],
})
export class LoanModule {}
