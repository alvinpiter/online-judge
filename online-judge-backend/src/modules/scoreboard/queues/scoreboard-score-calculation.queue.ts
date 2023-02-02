import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { PRIMARY_JOB_QUEUE } from 'src/modules/job/job.module';
import { JobQueue } from 'src/modules/job/job.queue';
import { JobService } from 'src/modules/job/job.service';

export interface ScoreboardScoreCalculationQueueItem {
  userId: number;
}

@Injectable()
export class ScoreboardScoreCalculationQueue extends JobQueue<ScoreboardScoreCalculationQueueItem> {
  constructor(
    @Inject(PRIMARY_JOB_QUEUE) client: ClientRMQ,
    jobService: JobService,
  ) {
    super(client, ScoreboardScoreCalculationQueue.name, jobService);
  }
}
