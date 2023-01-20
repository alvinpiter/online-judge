import { Injectable } from '@nestjs/common';
import { UserProblemAttemptsService } from 'src/modules/problems/services/user-problem-attempts.service';
import { SubmissionsService } from 'src/modules/submissions/submissions.service';
import { Transactional } from 'typeorm-transactional';
import { SubmissionRunDetailsService } from '../../submission-run-details.service';
import {
  SubmissionProcessingContext,
  SubmissionProcessingStrategy,
  SubmissionProcessor,
} from '../interfaces';
import { SubmissionProcessorService } from '../submission-processor.service';

@Injectable()
export class FirstTimeAcceptedSubmissionProcessingStrategy
  implements SubmissionProcessor
{
  constructor(
    submissionProcessorService: SubmissionProcessorService,
    private readonly submissionsService: SubmissionsService,
    private readonly submissionRunDetailsService: SubmissionRunDetailsService,
    private readonly userProblemAttemptsService: UserProblemAttemptsService,
  ) {
    submissionProcessorService.plugService(
      SubmissionProcessingStrategy.FIRST_TIME_ACCEPTED,
      this,
    );
  }

  @Transactional()
  async process(context: SubmissionProcessingContext) {
    await this.submissionsService.setSubmissionVerdict(
      context.submission.id,
      context.verdict,
    );

    await this.submissionRunDetailsService.saveSubmissionRunDetails(
      context.submissionRunDetails,
    );

    await this.userProblemAttemptsService.setFirstSolvedAtAndSave(
      context.submission.userId,
      context.submission.problemId,
    );
  }
}
