import { Injectable } from '@nestjs/common';
import { JobQueueItem } from '../job/interfaces';
import { JobService } from '../job/job.service';
import { GlobalSubmissionsStatisticsUpdateQueue } from './queues/global-submissions-statistics-update.queue';
import {
  SubmissionsJudgementQueue,
  SubmissionsJudgementQueueItem,
} from './queues/submissions-judgement.queue';
import { UserSubmissionsStatisticsUpdateQueue } from './queues/user-submissions-statistics-update.queue';

@Injectable()
export class SubmissionsService {
  constructor(
    private readonly submissionsJudgementQueue: SubmissionsJudgementQueue,
    private readonly userSubmissionsStatisticsUpdateQueue: UserSubmissionsStatisticsUpdateQueue,
    private readonly globalSubmissionsStatisticsUpdateQueue: GlobalSubmissionsStatisticsUpdateQueue,
    private readonly jobService: JobService,
  ) {
    this.submissionsJudgementQueue.setConsumer((item) => this.judge(item));
  }

  async submit() {
    const submissionId = Math.floor(Math.random() * 100);
    return this.submissionsJudgementQueue.enqueue({ submissionId });
  }

  async judge(
    submissionQueueItem: JobQueueItem<SubmissionsJudgementQueueItem>,
  ) {
    const jobId = submissionQueueItem.jobId;
    const submissionId = submissionQueueItem.item.submissionId;

    console.log(`Judging user's submission with ID ${submissionId}...`);

    const numberOfTestCases = 10;
    for (let tc = 1; tc <= numberOfTestCases; tc++) {
      console.log(`Running testcase ${tc}...`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await this.jobService.updateProgress(jobId, tc / numberOfTestCases);
    }

    await this.jobService.finishSuccessfully(jobId, 'All good!');

    console.log(`Done judging user's submission with ID ${submissionId}!`);

    this.userSubmissionsStatisticsUpdateQueue.enqueue({
      submissionId,
    });
    this.globalSubmissionsStatisticsUpdateQueue.enqueue({
      submissionId,
    });
  }
}
