import { Injectable } from '@nestjs/common';
import { JobQueueItem } from '../job/interfaces';
import {
  GlobalSubmissionsStatisticsUpdateQueue,
  GlobalSubmissionsStatisticsUpdateQueueItem,
} from '../submissions/queues/global-submissions-statistics-update.queue';
import {
  UserSubmissionsStatisticsUpdateQueue,
  UserSubmissionsStatisticsUpdateQueueItem,
} from '../submissions/queues/user-submissions-statistics-update.queue';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly userSubmissionsStatisticsUpdateQueue: UserSubmissionsStatisticsUpdateQueue,
    private readonly globalSubmissionsStatisticsUpdateQueue: GlobalSubmissionsStatisticsUpdateQueue,
  ) {
    this.userSubmissionsStatisticsUpdateQueue.setConsumer((item) =>
      this.updateUserSubmissonsStatistics(item),
    );

    this.globalSubmissionsStatisticsUpdateQueue.setConsumer((item) =>
      this.updateGlobalSubmissionsStatistics(item),
    );
  }

  async updateUserSubmissonsStatistics(
    item: JobQueueItem<UserSubmissionsStatisticsUpdateQueueItem>,
  ) {
    console.log(
      `Updating user's submissions statistics after submission with ID ${item.item.submissionId}...`,
    );
  }

  async updateGlobalSubmissionsStatistics(
    item: JobQueueItem<GlobalSubmissionsStatisticsUpdateQueueItem>,
  ) {
    console.log(
      `Updating global submissions statistics after submission with ID ${item.item.submissionId}...`,
    );
  }
}
