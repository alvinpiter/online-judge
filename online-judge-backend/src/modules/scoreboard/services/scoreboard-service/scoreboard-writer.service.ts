import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { JobQueueItem } from 'src/modules/job/interfaces';
import { UsersService } from 'src/modules/users/users.service';
import {
  GlobalScoreboardScoreCalculationQueue,
  GlobalScoreboardScoreCalculationQueueItem,
} from '../../queues/global-scoreboard-score-calculation.queue';
import { ScoreboardScoreCalculatorService } from '../scoreboard-score-calculator/scoreboard-score-calculator.service';
import { BaseScoreboardService } from './base-scoreboard.service';

@Injectable()
export class ScoreboardWriterService extends BaseScoreboardService {
  constructor(
    @InjectRedis() redisClient: Redis,
    usersService: UsersService,
    scoreboardScoreCalculationQueue: GlobalScoreboardScoreCalculationQueue,
    private readonly scoreboardScoreCalculatorService: ScoreboardScoreCalculatorService,
  ) {
    super(redisClient, usersService);
    scoreboardScoreCalculationQueue.setConsumer((item) =>
      this.processScoreboardScoreCalculation(item),
    );
  }

  async processScoreboardScoreCalculation(
    queueItem: JobQueueItem<GlobalScoreboardScoreCalculationQueueItem>,
  ) {
    const userId = queueItem.item.userId;

    const score = await this.scoreboardScoreCalculatorService.calculateScore(
      userId,
      this.SCORE_CALCULATION_STRATEGY,
    );

    const sortedSetMember =
      this.scoreboardSortedSetMemberMapper.toSortedSetMember(userId);

    await this.sortedSetService.upsertMemberScore(sortedSetMember, score);
  }
}
