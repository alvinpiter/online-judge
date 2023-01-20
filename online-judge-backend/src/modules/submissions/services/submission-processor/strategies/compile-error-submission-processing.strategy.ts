import { Injectable } from '@nestjs/common';
import { SubmissionsService } from 'src/modules/submissions/submissions.service';
import { Transactional } from 'typeorm-transactional';
import { SubmissionCompilationDetailsService } from '../../submission-compilation-details.service';
import {
  SubmissionProcessingContext,
  SubmissionProcessingStrategy,
  SubmissionProcessor,
} from '../interfaces';
import { SubmissionProcessorService } from '../submission-processor.service';

@Injectable()
export class CompileErrorSubmissionProcessingStrategy
  implements SubmissionProcessor
{
  constructor(
    submissionProcessorService: SubmissionProcessorService,
    private readonly submissionsService: SubmissionsService,
    private readonly submissionCompilationDetailsService: SubmissionCompilationDetailsService,
  ) {
    submissionProcessorService.plugService(
      SubmissionProcessingStrategy.COMPILE_ERROR,
      this,
    );
  }

  @Transactional()
  async process(context: SubmissionProcessingContext) {
    this.submissionsService.setSubmissionVerdict(
      context.submission.id,
      context.verdict,
    );

    this.submissionCompilationDetailsService.createSubmissionCompilationDetail(
      context.submission.id,
      context.compilationMessage || '',
    );
  }
}
