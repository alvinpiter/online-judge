import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { SECONDARY_JOB_QUEUE } from 'src/modules/job/job.module';
import { JobQueue } from 'src/modules/job/job.queue';
import { JobService } from 'src/modules/job/job.service';

export interface UserSearchScoreCalculationQueueItem {
  userId: number;
}

@Injectable()
export class UserSearchScoreCalculationQueue extends JobQueue<UserSearchScoreCalculationQueueItem> {
  constructor(
    @Inject(SECONDARY_JOB_QUEUE) client: ClientRMQ,
    jobService: JobService,
  ) {
    super(client, UserSearchScoreCalculationQueue.name, jobService);
  }
}
