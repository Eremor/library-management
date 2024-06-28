import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Book, Status } from '@prisma/client';
import { CreateBookDto } from './dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  private readonly logger = new Logger(BookService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateBookDto): Promise<Book> {
    try {
      const newBook = await this.prismaService.book
        .create({
          data: {
            title: dto.title,
            author: dto.author,
            publicYear: dto.publicYear,
            genres: dto.genres,
            status: Status.AVAILABLE,
          },
        })
        .catch(() => {
          throw new BadRequestException("Couldn't add book");
        });

      return newBook;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findOneById(id: string): Promise<Book> {
    try {
      const book = await this.prismaService.book.findFirst({
        where: {
          id,
        },
      });

      if (!book) {
        throw new BadRequestException("couldn't find the book");
      }

      return book;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findAll(): Promise<Book[]> {
    try {
      const bookList = await this.prismaService.book.findMany();

      if (!bookList) {
        throw new BadRequestException();
      }

      return bookList;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async update(id: string, dto: UpdateBookDto): Promise<Book> {
    try {
      const book = await this.prismaService.book.update({
        where: {
          id,
        },
        data: {
          title: dto.title,
          author: dto.author,
          publicYear: dto.publicYear,
          genres: dto.genres,
          status: dto.status,
        },
      });

      if (!book) {
        throw new BadRequestException("couldn't update the book");
      }

      return book;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const book = await this.prismaService.book
        .delete({
          where: {
            id,
          },
        })
        .catch(() => {
          throw new BadRequestException("couldn't delete the book");
        });

      return book.id;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
