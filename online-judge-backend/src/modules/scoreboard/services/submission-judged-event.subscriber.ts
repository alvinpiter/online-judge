import { Injectable } from '@nestjs/common';
import { SubmissionProcessorService } from '../../submissions/services/submission-processor/submission-processor.service';
import { SubmissionsService } from '../../submissions/submissions.service';
import { ScoreboardScoreCalculationQueue } from '../queues/scoreboard-score-calculation.queue';

@Injectable()
export class SubmissionJudgedEventSubscriber {
  constructor(
    submissionProcessorService: SubmissionProcessorService,
    private readonly submissionsService: SubmissionsService,
    private readonly scoreboardScoreCalculationQueue: ScoreboardScoreCalculationQueue,
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

    await this.scoreboardScoreCalculationQueue.enqueue({
      userId: submission.userId,
    });
  }
}
