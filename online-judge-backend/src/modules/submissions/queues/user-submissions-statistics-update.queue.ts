import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { SECONDARY_JOB_QUEUE } from 'src/modules/job/job.module';
import { JobQueue } from 'src/modules/job/job.queue';
import { JobService } from 'src/modules/job/job.service';

export interface UserSubmissionsStatisticsUpdateQueueItem {
  submissionId: number;
}

/*
TODO:
This module should not know about statistics module, hence we need to reversed the dependency.
* Implement Observable interface
* Define this queue (and UserSubmissionsStatisticsUpdateQueue) in statistics module. And
  they should listen to submission submitted event.
*
 */

@Injectable()
export class UserSubmissionsStatisticsUpdateQueue extends JobQueue<UserSubmissionsStatisticsUpdateQueueItem> {
  constructor(
    @Inject(SECONDARY_JOB_QUEUE) client: ClientRMQ,
    jobService: JobService,
  ) {
    super(client, UserSubmissionsStatisticsUpdateQueue.name, jobService);
  }
}
