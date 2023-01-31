import { Redis } from 'ioredis';
import { SortedSetService } from 'src/modules/cache/sorted-set/sorted-set.service';
import { UsersService } from 'src/modules/users/users.service';
import { ScoreboardScoreCalculationStrategy } from '../scoreboard-score-calculator/interfaces';
import { GlobalScoreboardSortedSetMemberMapper } from '../global-scoreboard-sorted-set-member-mapper';

export class BaseScoreboardService {
  protected SORTED_SET_KEY = 'Scoreboard';
  protected SCORE_CALCULATION_STRATEGY =
    ScoreboardScoreCalculationStrategy.BY_SOLVE_COUNT_AND_LAST_SOLVE_TIME;

  protected sortedSetService: SortedSetService;
  protected scoreboardSortedSetMemberMapper: GlobalScoreboardSortedSetMemberMapper;

  constructor(redisClient: Redis, usersService: UsersService) {
    this.sortedSetService = new SortedSetService(
      redisClient,
      this.SORTED_SET_KEY,
    );

    this.scoreboardSortedSetMemberMapper =
      new GlobalScoreboardSortedSetMemberMapper(usersService);
  }
}
