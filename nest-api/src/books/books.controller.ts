import {
  Body,
  Controller,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AddBookDto } from './dto/add-book.dto';
import { Book } from './books.entity';
import { BooksService } from './books.service';
import { GiveBookDto } from './dto/give-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly BookService: BooksService) {}

  @Post()
  async addBook(@Body() book: AddBookDto): Promise<Book | HttpException> {
    return await this.BookService.addBook(book);
  }

  @Put(':bookId/give/:userId')
  async giveBook( @Param() giveBookDto: GiveBookDto): Promise<string | HttpException> {
    return await this.BookService.giveBook(giveBookDto);
  }

  @Put(':bookId/return/:userId')
  async returnBook( @Param() giveBookDto: GiveBookDto): Promise<string | HttpException> {
    return this.BookService.returnBook(giveBookDto);
  }
}
