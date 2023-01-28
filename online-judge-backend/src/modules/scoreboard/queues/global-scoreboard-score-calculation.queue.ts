import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { PRIMARY_JOB_QUEUE } from 'src/modules/job/job.module';
import { JobQueue } from 'src/modules/job/job.queue';
import { JobService } from 'src/modules/job/job.service';

export interface GlobalScoreboardScoreCalculationQueueItem {
  userId: number;
}

@Injectable()
export class GlobalScoreboardScoreCalculationQueue extends JobQueue<GlobalScoreboardScoreCalculationQueueItem> {
  constructor(
    @Inject(PRIMARY_JOB_QUEUE) client: ClientRMQ,
    jobService: JobService,
  ) {
    super(client, GlobalScoreboardScoreCalculationQueue.name, jobService);
  }
}
