import { Injectable } from '@nestjs/common';
import { SubmissionVerdict } from '../../submissions/entities/submission.entity';
import { SubmissionProcessorService } from '../../submissions/services/submission-processor/submission-processor.service';
import { SubmissionsService } from '../../submissions/submissions.service';
import { GlobalScoreboardScoreCalculationQueue } from '../queues/global-scoreboard-score-calculation.queue';

@Injectable()
export class SubmissionJudgedEventSubscriber {
  constructor(
    submissionProcessorService: SubmissionProcessorService,
    private readonly submissionsService: SubmissionsService,
    private readonly globalScoreboardScoreCalculationQueue: GlobalScoreboardScoreCalculationQueue,
  ) {
    submissionProcessorService.addSubscriber(
      'submissionJudged',
      (submissionId) => this.handleJudgedSubmission(submissionId),
    );
  }

  async handleJudgedSubmission(submissionId: number) {
    const submission = await this.submissionsService.getSubmission(
      submissionId,
    );

    if (submission.verdict === SubmissionVerdict.ACCEPTED) {
      await this.globalScoreboardScoreCalculationQueue.enqueue({
        userId: submission.userId,
      });
    }
  }
}
