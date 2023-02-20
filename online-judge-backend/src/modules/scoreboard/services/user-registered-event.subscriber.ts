import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { ScoreboardScoreCalculationQueue } from '../queues/scoreboard-score-calculation.queue';

@Injectable()
export class UserRegisteredEventSubscriber {
  constructor(
    usersService: UsersService,
    private readonly scoreboardScoreCalculationQueue: ScoreboardScoreCalculationQueue,
  ) {
    usersService.addSubscriber('userRegistered', (userId) =>
      this.handleRegisteredUser(userId),
    );
  }

  async handleRegisteredUser(userId: number) {
    await this.scoreboardScoreCalculationQueue.enqueue({ userId });
  }
}
