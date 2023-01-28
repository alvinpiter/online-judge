import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { JobQueueItem } from '../../job/interfaces';
import {
  GlobalScoreboardScoreCalculationQueue,
  GlobalScoreboardScoreCalculationQueueItem,
} from '../queues/global-scoreboard-score-calculation.queue';

@Controller()
export class GlobalScoreboardScoreCalculationQueueController {
  constructor(
    private readonly globalScoreboardScoreCalculationQueue: GlobalScoreboardScoreCalculationQueue,
  ) {}

  @EventPattern(GlobalScoreboardScoreCalculationQueue.name)
  calculateScore(
    @Payload() item: JobQueueItem<GlobalScoreboardScoreCalculationQueueItem>,
    @Ctx() context: RmqContext,
  ) {
    this.globalScoreboardScoreCalculationQueue.consume(item, context);
  }
}
