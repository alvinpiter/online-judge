import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { GlobalScoreboardScoreCalculationQueue } from './queues/global-scoreboard-score-calculation.queue';

@Controller('api')
export class ScoreboardController {
  constructor(
    private readonly usersService: UsersService,
    private readonly queue: GlobalScoreboardScoreCalculationQueue,
  ) {}

  @Get('scoreboard/playground')
  async playground() {
    const users = await this.usersService.getAllUsers();
    for (const user of users) {
      this.queue.enqueue({ userId: user.id });
    }

    return 'ok';
  }
}
