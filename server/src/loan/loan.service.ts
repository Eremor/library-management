import { BookService } from '@book/book.service';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { UserService } from '@user/user.service';
import { CreateLoanDto } from './dto';
import { ResponseLoan } from './interfaces';

@Injectable()
export class LoanService {
  private readonly logger = new Logger(LoanService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly bookService: BookService,
    private readonly userService: UserService,
  ) {}

  async create({ userId, bookId }: CreateLoanDto): Promise<ResponseLoan> {
    try {
      const user = await this.userService.findOneById(userId);
      const book = await this.bookService.findOneById(bookId);

      if (book.status === 'ISSUED') {
        throw new BadRequestException(
          `Book ${book.title} has already been given to someone`,
        );
      }

      if (!user || !book) {
        throw new NotFoundException();
      }

      await this.bookService.update(bookId, { ...book, status: 'ISSUED' });

      const loan = await this.prismaService.loan.create({
        data: {
          issueDate: new Date(),
          returnDate: null,
          bookId,
          userId,
        },
      });

      if (!loan) {
        throw new BadRequestException();
      }

      return { loan, user, book };
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }
}
