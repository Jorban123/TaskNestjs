import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './subcription.entity';
import { User } from '../users/users.entity';

@Injectable()
export class SubcriptionServices {
  constructor(
    @InjectRepository(Subscription)
    private SubscriptionRepository: Repository<Subscription>,
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  //Метод покупки абонемента
  async subscribe(userId: number): Promise<string | HttpException> {
    try {
      const user = await this.UserRepository.findOne({
        relations: { subscription: true },
        where: { id: userId },
      });
      if (user.subscription)
        return new HttpException('У Вас уже есть подписка', 400);
      const sub = new Subscription();
      sub.user = user;
      await this.SubscriptionRepository.save(sub);
      return 'Абонемент выдан';
    } catch (e) {
      return new HttpException(e, 400);
    }
  }
}
