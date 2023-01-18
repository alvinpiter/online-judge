import { SubmissionCompilationDetail } from '../entities/submission-compilation-detail.entity';
import { SubmissionRunDetailWithTestCase } from './submission-run-detail-with-test-case';
import { SubmissionWithResolvedProperty } from './submission-with-resolved-property';

export class SubmissionWithDetails extends SubmissionWithResolvedProperty {
  compilationDetail?: SubmissionCompilationDetail;
  runDetails: SubmissionRunDetailWithTestCase[];
}
