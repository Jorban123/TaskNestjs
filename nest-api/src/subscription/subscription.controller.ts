import { Controller, Param, Post } from '@nestjs/common';
import { SubcriptionServices } from './subcription.services';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubcriptionServices) {}

  @Post(':id')
  create(@Param('id') userId: number): Promise<string> {
    return this.subscriptionService.subscribe(userId);
  }
}
