import {
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.subscription, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
