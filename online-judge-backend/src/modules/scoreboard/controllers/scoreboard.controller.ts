import { Controller, Get } from '@nestjs/common';
import { SortedSetPaginatedQueryBuilder } from 'src/modules/cache/sorted-set/sorted-set-paginated-query-builder';
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
    const qb = new SortedSetPaginatedQueryBuilder(
      this.globalScoreboardSortedSetService,
    );

    qb.addMemberFilter('admin');
    qb.offset(20);
    qb.limit(5);

    return qb.getDataAndTotalCount();
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
