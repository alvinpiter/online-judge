import { Injectable } from '@nestjs/common';
import { JobQueueItem } from 'src/modules/job/interfaces';
import { UsersService } from 'src/modules/users/users.service';
import {
  ScoreboardScoreCalculationQueue,
  ScoreboardScoreCalculationQueueItem,
} from '../queues/scoreboard-score-calculation.queue';
import { ScoreboardEntitySorterService } from './scoreboard-entity-sorter.service';

@Injectable()
export class ScoreboardWriterService {
  constructor(
    scoreboardScoreCalculationQueue: ScoreboardScoreCalculationQueue,
    private readonly scoreboardEntitySorterService: ScoreboardEntitySorterService,
    private readonly usersService: UsersService,
  ) {
    scoreboardScoreCalculationQueue.setConsumer((item) =>
      this.processScoreboardScoreCalculation(item),
    );
  }

  async processScoreboardScoreCalculation(
    queueItem: JobQueueItem<ScoreboardScoreCalculationQueueItem>,
  ) {
    const userId = queueItem.item.userId;
    const user = await this.usersService.findById(userId);

    await this.scoreboardEntitySorterService.updateUserScore(user);
  }
}
