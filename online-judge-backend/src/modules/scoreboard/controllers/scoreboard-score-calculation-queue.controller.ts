import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { JobQueueItem } from '../../job/interfaces';
import {
  ScoreboardScoreCalculationQueue,
  ScoreboardScoreCalculationQueueItem,
} from '../queues/scoreboard-score-calculation.queue';

@Controller()
export class ScoreboardScoreCalculationQueueController {
  constructor(
    private readonly scoreboardScoreCalculationQueue: ScoreboardScoreCalculationQueue,
  ) {}

  @EventPattern(ScoreboardScoreCalculationQueue.name)
  calculateScore(
    @Payload() item: JobQueueItem<ScoreboardScoreCalculationQueueItem>,
    @Ctx() context: RmqContext,
  ) {
    this.scoreboardScoreCalculationQueue.consume(item, context);
  }
}
