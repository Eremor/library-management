import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() dto: CreateBookDto) {
    return this.bookService.create(dto);
  }

  @Get(':id')
  async findOneBook(@Param('id') id: string) {
    return this.bookService.findOneById(id);
  }

  @Get()
  async findAll() {
    return this.bookService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    return this.bookService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.bookService.delete(id);
  }
}
