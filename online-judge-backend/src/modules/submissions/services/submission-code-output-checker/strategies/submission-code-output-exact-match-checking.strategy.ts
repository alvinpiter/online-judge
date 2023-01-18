import { Injectable } from '@nestjs/common';
import { CodeRunResult } from 'src/modules/code-runner/interfaces';
import { ProblemTestCaseWithContent } from 'src/modules/problems/interfaces/problem-test-case-with-content';
import { SubmissionVerdict } from 'src/modules/submissions/entities/submission.entity';
import {
  SubmissionCodeOutputChecker,
  SubmissionCodeOutputCheckingStrategy,
} from '../interfaces';
import { SubmissionCodeOutputCheckerService } from '../submission-code-output-checker.service';

@Injectable()
export class SubmissionCodeOutputExactMatchCheckingStrategy
  implements SubmissionCodeOutputChecker
{
  constructor(
    submissionCodeOutputCheckerService: SubmissionCodeOutputCheckerService,
  ) {
    submissionCodeOutputCheckerService.plugService(
      SubmissionCodeOutputCheckingStrategy.EXACT_MATCH,
      this,
    );
  }

  async check(
    testCase: ProblemTestCaseWithContent,
    codeRunResult: CodeRunResult,
  ): Promise<SubmissionVerdict> {
    return codeRunResult.detail.output === testCase.output
      ? SubmissionVerdict.ACCEPTED
      : SubmissionVerdict.WRONG_ANSWER;
  }
}
