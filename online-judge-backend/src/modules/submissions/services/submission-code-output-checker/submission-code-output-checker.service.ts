import { Injectable } from '@nestjs/common';
import { PluggableService } from 'src/lib/PluggableService';
import {
  CodeRunResult,
  CodeRunVerdict,
} from 'src/modules/code-runner/interfaces';
import { ProblemTestCaseWithContent } from 'src/modules/problems/interfaces/problem-test-case-with-content';
import { SubmissionVerdict } from '../../entities/submission.entity';
import {
  SubmissionCodeOutputChecker,
  SubmissionCodeOutputCheckingStrategy,
} from './interfaces';

@Injectable()
export class SubmissionCodeOutputCheckerService extends PluggableService<
  SubmissionCodeOutputCheckingStrategy,
  SubmissionCodeOutputChecker
> {
  // TODO: Revisit the parameters
  // We need extra information to know which strategy will be used.
  async check(
    testCase: ProblemTestCaseWithContent,
    codeRunResult: CodeRunResult,
  ): Promise<SubmissionVerdict> {
    if (codeRunResult.verdict === CodeRunVerdict.RUN_TIME_ERROR) {
      return SubmissionVerdict.RUN_TIME_ERROR;
    }

    if (codeRunResult.verdict === CodeRunVerdict.TIME_LIMIT_EXCEEDED) {
      return SubmissionVerdict.TIME_LIMIT_EXCEEDED;
    }

    // Only use exact match strategy for now
    const strategy = SubmissionCodeOutputCheckingStrategy.EXACT_MATCH;
    const service = this.pluggedServices.get(strategy);

    return service.check(testCase, codeRunResult);
  }
}
