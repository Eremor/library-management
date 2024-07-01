import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { LoanModule } from './loan/loan.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    BookModule,
    ConfigModule.forRoot({ isGlobal: true }),
    LoanModule,
  ],
})
export class AppModule {}
