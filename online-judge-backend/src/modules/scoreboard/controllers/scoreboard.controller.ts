import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { ScoreboardGetDto } from '../data-transfer-objects/scoreboard-get.dto';
import { ScoreboardRowFormatter } from '../formatters/scoreboard-row.formatter';
import { ScoreboardScoreCalculationQueue } from '../queues/scoreboard-score-calculation.queue';
import { ScoreboardReaderService } from '../services/scoreboard-reader.service';

@Controller('api')
export class ScoreboardController {
  constructor(
    private readonly scoreboardRowFormatter: ScoreboardRowFormatter,
    private readonly scoreboardReaderService: ScoreboardReaderService,
    private readonly scoreboardScoreCalculationQueue: ScoreboardScoreCalculationQueue,
    private readonly usersService: UsersService,
  ) {}

  @Get('scoreboard/playground')
  async playground() {
    const users = await this.usersService.getAllUsers();
    for (const user of users) {
      this.scoreboardScoreCalculationQueue.enqueue({ userId: user.id });
    }
    return 'ok';
  }

  @Get('scoreboard')
  async getScoreboard(@Query() scoreboardGetDto: ScoreboardGetDto) {
    const { data, meta } = await this.scoreboardReaderService.getScoreboard(
      scoreboardGetDto,
    );

    return {
      data: data.map((row) => this.scoreboardRowFormatter.format(row)),
      meta,
    };
  }

  @Get('scoreboard/problems')
  async getScoreboardProblems() {
    return this.scoreboardReaderService.getScoreboardProblems();
  }
}
