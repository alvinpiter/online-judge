import { Injectable } from '@nestjs/common';
import { ProgrammingLanguage } from 'src/constants/programming-languages';
import { PluggableService } from 'src/lib/PluggableService';
import { ProblemTestCaseWithContent } from 'src/modules/problems/interfaces/problem-test-case-with-content';
import {
  SubmissionCodeRunner,
  SubmissionCodeRunningStrategy,
} from './interfaces';

@Injectable()
export class SubmissionCodeRunnerService extends PluggableService<
  SubmissionCodeRunningStrategy,
  SubmissionCodeRunner
> {
  // TODO: Revisit the parameters
  // We need extra information to know which strategy will be used.
  async run(
    programmingLanguage: ProgrammingLanguage,
    sourceCode: string,
    testCases: ProblemTestCaseWithContent[],
  ) {
    const strategy = SubmissionCodeRunningStrategy.IO;
    const service = this.pluggedServices.get(strategy);

    return service.run(programmingLanguage, sourceCode, testCases);
  }
}
