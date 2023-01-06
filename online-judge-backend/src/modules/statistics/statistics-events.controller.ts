import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import {
  GlobalSubmissionsStatisticsUpdateQueue,
  GlobalSubmissionsStatisticsUpdateQueueItem,
} from '../submissions/queues/global-submissions-statistics-update.queue';
import {
  UserSubmissionsStatisticsUpdateQueue,
  UserSubmissionsStatisticsUpdateQueueItem,
} from '../submissions/queues/user-submissions-statistics-update.queue';

@Controller()
export class StatisticsEventsController {
  constructor(
    private readonly userSubmissionsStatisticsUpdateQueue: UserSubmissionsStatisticsUpdateQueue,
    private readonly globalSubmissionsStatisticsUpdateQueue: GlobalSubmissionsStatisticsUpdateQueue,
  ) {}

  @EventPattern(UserSubmissionsStatisticsUpdateQueue.name)
  updateUserSubmissionsStatistics(
    @Payload() item: UserSubmissionsStatisticsUpdateQueueItem,
    @Ctx() context: RmqContext,
  ) {
    this.userSubmissionsStatisticsUpdateQueue.consume(item, context);
  }

  @EventPattern(GlobalSubmissionsStatisticsUpdateQueue.name)
  updateGlobalSubmissionsStatistics(
    @Payload() item: GlobalSubmissionsStatisticsUpdateQueueItem,
    @Ctx() context: RmqContext,
  ) {
    this.globalSubmissionsStatisticsUpdateQueue.consume(item, context);
  }
}
