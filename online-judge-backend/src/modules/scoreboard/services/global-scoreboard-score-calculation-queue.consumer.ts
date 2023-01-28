import { Injectable } from '@nestjs/common';
import { JobQueueItem } from 'src/modules/job/interfaces';
import { UsersService } from 'src/modules/users/users.service';
import {
  GlobalScoreboardScoreCalculationQueue,
  GlobalScoreboardScoreCalculationQueueItem,
} from '../queues/global-scoreboard-score-calculation.queue';
import { GlobalScoreboardScoreCalculatorService } from './global-scoreboard-score-calculator/global-scoreboard-score-calculator.service';
import { GlobalScoreboardSortedSetService } from './global-scoreboard-sorted-set.service';

@Injectable()
export class GlobalScoreboardScoreCalculationQueueConsumer {
  constructor(
    globalScoreboardScoreCalculationQueue: GlobalScoreboardScoreCalculationQueue,
    private readonly globalScoreboardScoreCalculatorService: GlobalScoreboardScoreCalculatorService,
    private readonly globalScoreboardSortedSetService: GlobalScoreboardSortedSetService,
    private readonly usersService: UsersService,
  ) {
    globalScoreboardScoreCalculationQueue.setConsumer((item) =>
      this.processGlobalScoreboardScoreCalculation(item),
    );
  }

  async processGlobalScoreboardScoreCalculation(
    queueItem: JobQueueItem<GlobalScoreboardScoreCalculationQueueItem>,
  ) {
    const userId = queueItem.item.userId;
    const user = await this.usersService.findById(userId);

    const score =
      await this.globalScoreboardScoreCalculatorService.calculateScore(userId);

    await this.globalScoreboardSortedSetService.upsertMemberScore(
      user.username,
      score,
    );
  }
}
