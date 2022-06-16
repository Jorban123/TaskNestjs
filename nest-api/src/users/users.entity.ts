import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from '../books/books.entity';
import { Subscription } from '../subscription/subcription.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @OneToOne(() => Subscription, (subscription) => subscription.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subscriprtionId' })
  subscription: Subscription;

  @Column({ default: 0 })
  countBooks: number;

  @OneToMany(() => Book, (book) => book.user)
  book: Book[];
}
