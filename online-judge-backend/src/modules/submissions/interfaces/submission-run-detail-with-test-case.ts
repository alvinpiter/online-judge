import { ProblemTestCase } from 'src/modules/problems/entities/problem-test-case.entity';
import { SubmissionRunDetail } from '../entities/submission-run-detail.entity';

export class SubmissionRunDetailWithTestCase extends SubmissionRunDetail {
  testCase: ProblemTestCase;
}
