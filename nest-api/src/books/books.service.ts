import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './books.entity';
import { AddBookDto } from './dto/add-book.dto';
import { User } from '../users/users.entity';
import { GiveBookDto } from './dto/give-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private BookRepository: Repository<Book>,
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  //Метод добавления книги
  async addBook(book: AddBookDto): Promise<Book> {
    try {
      const newBook = await this.BookRepository.create(book);
      return await this.BookRepository.save(newBook);
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }

  //Метод добавления книги пользователю
  async giveBook(giveBookDto: GiveBookDto): Promise<string> {
    try {
      const userId = giveBookDto.userId;
      const bookId = giveBookDto.bookId;
      const user = await this.UserRepository.findOne({
        relations: { subscription: true },
        where: { id: userId },
      });
      const book = await this.BookRepository.findOne({
        relations: { user: true },
        where: { id: bookId },
      });
      if (!book) {
        throw new HttpException('Данной книги нет', 400);
      }
      if (book.user != null) {
        throw new HttpException('Данная книга уже занята', 400);
      }
      if (!user) {
        throw new HttpException('Пользователь не существует', 400);
      }
      if (user.countBooks === 5) {
        throw new HttpException('У Вас максимальное количество книг', 400);
      }
      if (user.subscription == null) {
        throw new HttpException('У Вас нет подписки', 400);
      }

      await this.BookRepository.update(bookId, { user: user });
      await this.UserRepository.increment({ id: userId }, 'countBooks', 1);
      return 'Книга успешно выдана';
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }

  //Метод возвращения книги обратно
  async returnBook(returnBookDto: ReturnBookDto): Promise<string> {
    try {
      const userId = returnBookDto.userId;
      const bookId = returnBookDto.bookId;
      const book = await this.BookRepository.findOne({
        relations: { user: true },
        where: { id: bookId },
      });
      if (!book) {
        throw new HttpException('Данной книги нет', 400);
      }
      if (!book.user) {
        throw new HttpException('Книга не взята', 400);
      }
      if (book.user.id != userId) {
        throw new HttpException('Книга принадлежит не Вам', 400);
      }
      await this.BookRepository.update(bookId, { user: null });
      await this.UserRepository.decrement({ id: userId }, 'countBooks', 1);
      return 'Книга успешно возвращена';
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }
}
