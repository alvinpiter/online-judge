import { SubmissionRunDetailWithoutId } from '../../entities/submission-run-detail.entity';
import {
  Submission,
  SubmissionVerdict,
} from '../../entities/submission.entity';

export enum SubmissionProcessingStrategy {
  COMPILE_ERROR = 'COMPILE_ERROR',
  NOT_ACCEPTED = 'NOT_ACCEPTED',
  FIRST_TIME_ACCEPTED = 'FIRST_TIME_ACCEPTED',
  NTH_TIME_ACCEPTED = 'NTH_TIME_ACCEPTED',
}

export interface SubmissionProcessingContext {
  submission: Submission;
  verdict: SubmissionVerdict;
  submissionRunDetails?: SubmissionRunDetailWithoutId[];
  compilationMessage?: string;
}

export interface SubmissionProcessor {
  process: (context: SubmissionProcessingContext) => Promise<void>;
}
