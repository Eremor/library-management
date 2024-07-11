import { BookService } from '@book/book.service';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { UserService } from '@user/user.service';
import { CreateLoanDto, UpdateLoanDto } from './dto';
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
          giveDate: new Date(),
          returnDate: null,
          active: true,
          bookId,
          userId,
        },
      });

      if (!loan) {
        throw new BadRequestException();
      }

      return {
        loan,
        user: {
          id: user.id,
          userName: user.userName,
        },
        book: {
          id: book.id,
          title: book.title,
        },
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "Couldn't add loan",
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  async findAll() {
    try {
      const loans = await this.prismaService.loan.findMany();

      if (!loans) {
        throw new NotFoundException();
      }

      return await Promise.all(
        loans.map(async (loan) => {
          const user = await this.userService.findOneById(loan.userId);
          const book = await this.bookService.findOneById(loan.bookId);

          if (!user || !book) {
            throw new NotFoundException();
          }

          return {
            loan,
            user: {
              id: user.id,
              userName: user.userName,
            },
            book: {
              id: book.id,
              title: book.title,
            },
          };
        }),
      );
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "couldn't find loans",
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }

  async findOneByBookId(bookId: string) {
    try {
      const loan = await this.prismaService.loan
        .findFirst({
          where: {
            bookId,
          },
        })
        .catch(() => {
          throw new NotFoundException("couldn't find the book");
        });

      return loan;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: error.message,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }

  async update({ bookId, userId }: UpdateLoanDto): Promise<ResponseLoan> {
    try {
      const loan = await this.findOneByBookId(bookId);
      const book = await this.bookService.findOneById(bookId);
      const user = await this.userService.findOneById(userId);

      if (!loan) {
        throw new NotFoundException("couldn't find loan");
      }

      const updateLoan = await this.prismaService.loan.update({
        where: {
          id: loan.id,
        },
        data: {
          returnDate: new Date(),
          active: false,
        },
      });

      if (!updateLoan) {
        throw new BadRequestException("couldn't update loan");
      }

      if (book.status === 'AVAILABLE') {
        throw new BadRequestException('The book is free');
      }

      await this.bookService.update(bookId, { ...book, status: 'AVAILABLE' });

      return {
        loan: updateLoan,
        user: {
          id: user.id,
          userName: user.userName,
        },
        book: {
          id: book.id,
          title: book.title,
        },
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
