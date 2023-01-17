import { Injectable } from '@nestjs/common';
import { ProblemTestCasesFormatter } from 'src/modules/problems/formatters/problem-test-cases.formatter';
import { UserFormatter } from 'src/modules/users/formatters/user.formatter';
import { SubmissionWithResolvedProperty } from '../interfaces/submission-with-resolved-property';
import { SubmissionWithDetails } from '../interfaces/submition-with-details';

@Injectable()
export class SubmissionFormatter {
  constructor(
    private readonly userFormatter: UserFormatter,
    private readonly problemTestCaseFormatter: ProblemTestCasesFormatter,
  ) {}

  format(submission: SubmissionWithResolvedProperty) {
    return {
      id: submission.id,
      user: this.userFormatter.format(submission.user),
      problem: submission.problem,
      programmingLanguage: submission.programmingLanguage,
      code: submission.code,
      submittedAt: submission.submittedAt.toISOString(),
      verdict: submission.verdict,
    };
  }

  async formatSubmissionWithDetails(
    submissionWithDetails: SubmissionWithDetails,
  ) {
    const runDetails = await Promise.all(
      submissionWithDetails.runDetails.map(async (detail) => ({
        ...detail,
        testCase: await this.problemTestCaseFormatter.formatProblemTestCase(
          detail.testCase,
        ),
      })),
    );

    return {
      ...this.format(submissionWithDetails),
      compilationDetail: submissionWithDetails.compilationDetail,
      runDetails,
    };
  }
}
