import { Injectable } from '@nestjs/common';
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
  ) {
    this.submissionsJudgementQueue.setConsumer((item) => this.judge(item));
  }

  submit() {
    const submissionId = Math.floor(Math.random() * 100);

    // TODO: apply observer pattern here
    this.submissionsJudgementQueue.enqueue({ submissionId });

    return 'ok';
  }

  async judge(item: SubmissionsJudgementQueueItem) {
    const submissionId = item.submissionId;

    console.log(`Judging user's submission with ID ${submissionId}...`);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(`Done judging user's submission with ID ${submissionId}!`);

    // TODO: apply observer pattern here
    this.userSubmissionsStatisticsUpdateQueue.enqueue({
      submissionId,
    });
    this.globalSubmissionsStatisticsUpdateQueue.enqueue({
      submissionId,
    });
  }
}
