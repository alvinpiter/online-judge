import { Injectable } from '@nestjs/common';
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
export class NthTimeAcceptedSubmissionProcessor implements SubmissionProcessor {
  constructor(
    submissionProcessorService: SubmissionProcessorService,
    private readonly submissionsService: SubmissionsService,
    private readonly submissionRunDetailsService: SubmissionRunDetailsService,
  ) {
    submissionProcessorService.plugService(
      SubmissionProcessingStrategy.NTH_TIME_ACCEPTED,
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
  }
}
