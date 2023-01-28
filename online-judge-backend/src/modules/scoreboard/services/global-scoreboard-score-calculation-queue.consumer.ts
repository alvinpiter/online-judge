import { Injectable } from '@nestjs/common';
import { JobQueueItem } from 'src/modules/job/interfaces';
import {
  GlobalScoreboardScoreCalculationQueue,
  GlobalScoreboardScoreCalculationQueueItem,
} from '../queues/global-scoreboard-score-calculation.queue';

@Injectable()
export class GlobalScoreboardScoreCalculationQueueConsumer {
  constructor(
    globalScoreboardScoreCalculationQueue: GlobalScoreboardScoreCalculationQueue,
  ) {
    globalScoreboardScoreCalculationQueue.setConsumer((item) =>
      this.processGlobalScoreboardScoreCalculation(item),
    );
  }

  async processGlobalScoreboardScoreCalculation(
    queueItem: JobQueueItem<GlobalScoreboardScoreCalculationQueueItem>,
  ) {
    console.log(
      `Processing scoreboard score calculation for user ${queueItem.item.userId}`,
    );
  }
}
