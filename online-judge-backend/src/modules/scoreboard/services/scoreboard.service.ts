import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { SortedSetOrder } from 'src/modules/cache/sorted-set/sorted-set-paginated-query-builder';
import { SortedSetService } from 'src/modules/cache/sorted-set/sorted-set.service';
import { JobQueueItem } from 'src/modules/job/interfaces';
import { OffsetPaginationService } from 'src/modules/pagination/offset-pagination.service';
import { User } from 'src/modules/users/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { EntitySorterService } from '../helpers/entity-sorter/entity-sorter.service';
import { ScoreboardScoringSchema } from '../interfaces/scoreboard-scoring-schema';
import {
  GlobalScoreboardScoreCalculationQueue,
  GlobalScoreboardScoreCalculationQueueItem,
} from '../queues/global-scoreboard-score-calculation.queue';
import { ScoreboardEntityIdentifierMapper } from './scoreboard-entity-identifier-mapper';
import { ScoreboardScoreCalculator } from './scoreboard-score-calculator';

@Injectable()
export class ScoreboardService {
  private SORTED_SET_KEY = 'Scoreboard';
  private SORTED_SET_ORDER = SortedSetOrder.SCORE_DESC;

  private sortedSetService: SortedSetService;
  private entitySorterService: EntitySorterService<
    User,
    ScoreboardScoringSchema
  >;

  constructor(
    globalScoreboardScoreCalculationQueue: GlobalScoreboardScoreCalculationQueue,
    @InjectRedis() redisClient: Redis,
    private readonly scoreboardEntityIdentifierMapper: ScoreboardEntityIdentifierMapper,
    private readonly scoreboardScoreCalculator: ScoreboardScoreCalculator,
    private readonly offsetPaginationService: OffsetPaginationService,
    private readonly usersService: UsersService,
  ) {
    this.sortedSetService = new SortedSetService(
      redisClient,
      this.SORTED_SET_KEY,
    );

    this.entitySorterService = new EntitySorterService(
      this.SORTED_SET_ORDER,
      this.sortedSetService,
      this.scoreboardEntityIdentifierMapper,
      this.scoreboardScoreCalculator,
      this.offsetPaginationService,
    );

    globalScoreboardScoreCalculationQueue.setConsumer((item) =>
      this.processScoreboardScoreCalculation(item),
    );
  }

  async processScoreboardScoreCalculation(
    queueItem: JobQueueItem<GlobalScoreboardScoreCalculationQueueItem>,
  ) {
    const userId = queueItem.item.userId;
    const user = await this.usersService.findById(userId);

    this.entitySorterService.updateEntityScore(user);
  }
}
