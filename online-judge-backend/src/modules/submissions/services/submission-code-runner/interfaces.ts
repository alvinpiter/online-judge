import { ProgrammingLanguage } from 'src/constants/programming-languages';
import { CodeRunResult } from 'src/modules/code-runner/interfaces';
import { ProblemTestCaseWithContent } from 'src/modules/problems/interfaces/problem-test-case-with-content';

export enum SubmissionCodeRunningStrategy {
  IO = 'IO',
}

export interface SubmissionCodeRunner {
  run(
    programmingLanguage: ProgrammingLanguage,
    sourceCode: string,
    testCases: ProblemTestCaseWithContent[],
  ): Promise<CodeRunResult[]>;
}
