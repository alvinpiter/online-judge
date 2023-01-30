import { Controller, Get } from '@nestjs/common';
import { ScoreboardRowFormatter } from '../formatters/scoreboard-row.formatter';
import { GlobalScoreboardSortedSetService } from '../services/global-scoreboard-sorted-set.service';
import { ScoreboardService } from '../services/scoreboard.service';

@Controller('api')
export class ScoreboardController {
  constructor(
    private readonly scoreboardService: ScoreboardService,
    private readonly scoreboardRowFormatter: ScoreboardRowFormatter,
    private readonly globalScoreboardSortedSetService: GlobalScoreboardSortedSetService,
  ) {}

  @Get('scoreboard/playground')
  async playground() {
    await this.globalScoreboardSortedSetService.getMembers(['admin', 'fakhri']);
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
