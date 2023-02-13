import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { JobQueueItem } from 'src/modules/job/interfaces';
import {
  UserSearchScoreCalculationQueue,
  UserSearchScoreCalculationQueueItem,
} from '../queues/user-search-score-calculation.queue';

@Controller()
export class UserSearchScoreCalculationEventsController {
  constructor(
    private readonly userSearchScoreCalculationQueue: UserSearchScoreCalculationQueue,
  ) {}

  @EventPattern(UserSearchScoreCalculationQueue.name)
  calculateScore(
    @Payload() item: JobQueueItem<UserSearchScoreCalculationQueueItem>,
    @Ctx() context: RmqContext,
  ) {
    this.userSearchScoreCalculationQueue.consume(item, context);
  }
}
