import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { UserSearchScoreCalculationQueue } from '../queues/user-search-score-calculation.queue';

@Injectable()
export class UserRegisteredEventSubscriber {
  constructor(
    usersService: UsersService,
    private readonly userSearchScoreCalculationQueue: UserSearchScoreCalculationQueue,
  ) {
    usersService.addSubscriber('userRegistered', (userId) =>
      this.handleRegisteredUser(userId),
    );
  }

  async handleRegisteredUser(userId: number) {
    await this.userSearchScoreCalculationQueue.enqueue({ userId });
  }
}
