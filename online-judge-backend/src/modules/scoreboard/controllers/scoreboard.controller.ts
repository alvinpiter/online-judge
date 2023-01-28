import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { ScoreboardRowFormatter } from '../formatters/scoreboard-row.formatter';
import { GlobalScoreboardScoreCalculationQueue } from '../queues/global-scoreboard-score-calculation.queue';
import { ScoreboardService } from '../services/scoreboard.service';

@Controller('api')
export class ScoreboardController {
  constructor(
    private readonly usersService: UsersService,
    private readonly scoreboardService: ScoreboardService,
    private readonly scoreboardRowFormatter: ScoreboardRowFormatter,
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

  @Get('scoreboard')
  async getScoreboard() {
    const scoreboard = await this.scoreboardService.getScoreboard();
    return {
      ...scoreboard,
      data: scoreboard.data.map((row) =>
        this.scoreboardRowFormatter.format(row),
      ),
    };
  }

  @Get('scoreboard/problems')
  async getScoreboardProblems() {
    return this.scoreboardService.getScoreboardProblems();
  }
}
