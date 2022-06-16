import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './subcription.entity';
import { SubscriptionController } from './subscription.controller';
import { SubcriptionServices } from './subcription.services';
import { User } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, User])],
  controllers: [SubscriptionController],
  providers: [SubcriptionServices],
})
export class SubscriptionModule {}
