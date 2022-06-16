import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Book } from './books/books.entity';
import { BooksModule } from './books/books.module';
import { Subscription } from './subscription/subcription.entity';
import { SubscriptionModule } from './subscription/subscription.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'zazul',
      password: 'root',
      database: 'nest',
      entities: [User, Book, Subscription],
      synchronize: true,
    }),
    UsersModule,
    BooksModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
