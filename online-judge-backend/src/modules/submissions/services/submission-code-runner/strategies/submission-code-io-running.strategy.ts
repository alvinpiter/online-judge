import { Injectable } from '@nestjs/common';
import { ProgrammingLanguage } from 'src/constants/programming-languages';
import { CodeRunnerService } from 'src/modules/code-runner/code-runner.service';
import { CodeRunResult } from 'src/modules/code-runner/interfaces';
import { ProblemTestCaseWithContent } from 'src/modules/problems/interfaces/problem-test-case-with-content';
import {
  SubmissionCodeRunner,
  SubmissionCodeRunningStrategy,
} from '../interfaces';
import { SubmissionCodeRunnerService } from '../submission-code-runner.service';

@Injectable()
export class SubmissionCodeIORunningStrategy implements SubmissionCodeRunner {
  constructor(
    private readonly codeRunnerService: CodeRunnerService,
    submissionCodeRunnerService: SubmissionCodeRunnerService,
  ) {
    submissionCodeRunnerService.plugService(
      SubmissionCodeRunningStrategy.IO,
      this,
    );
  }

  async run(
    programmingLanguage: ProgrammingLanguage,
    sourceCode: string,
    testCases: ProblemTestCaseWithContent[],
  ): Promise<CodeRunResult[]> {
    return this.codeRunnerService.runCode(
      programmingLanguage,
      sourceCode,
      testCases.map((tc) => tc.input),
    );
  }
}
