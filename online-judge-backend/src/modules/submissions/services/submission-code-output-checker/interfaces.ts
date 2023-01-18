import { CodeRunResult } from 'src/modules/code-runner/interfaces';
import { ProblemTestCaseWithContent } from 'src/modules/problems/interfaces/problem-test-case-with-content';
import { SubmissionVerdict } from '../../entities/submission.entity';

export enum SubmissionCodeOutputCheckingStrategy {
  EXACT_MATCH = 'EXACT_MATCH',
}

export interface SubmissionCodeOutputChecker {
  check(
    testCase: ProblemTestCaseWithContent,
    codeRunResult: CodeRunResult,
  ): Promise<SubmissionVerdict>;
}
