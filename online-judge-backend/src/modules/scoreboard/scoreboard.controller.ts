import { Controller, Get } from '@nestjs/common';
import { GlobalScoreboardSortedSetService } from './services/global-scoreboard-sorted-set.service';

@Controller('api')
export class ScoreboardController {
  constructor(
    private readonly globalScoreboardSortedSetService: GlobalScoreboardSortedSetService,
  ) {}

  @Get('scoreboard/playground')
  async playground() {
    await this.globalScoreboardSortedSetService.upsertMemberScore('alvin', 5);
    await this.globalScoreboardSortedSetService.upsertMemberScore('dono', 1);

    return this.globalScoreboardSortedSetService.getMembersByRankRange(0, 1);
  }
}
