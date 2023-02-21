import { Injectable } from '@nestjs/common';
import { ObjectStorageService } from 'src/modules/object-storage/object-storage.service';
import { ProblemTestCasesFormatter } from 'src/modules/problems/formatters/problem-test-cases.formatter';
import { UserFormatter } from 'src/modules/users/formatters/user.formatter';
import { SubmissionRunDetail } from '../entities/submission-run-detail.entity';
import { SubmissionWithResolvedProperty } from '../interfaces/submission-with-resolved-property';
import { SubmissionWithDetails } from '../interfaces/submition-with-details';

@Injectable()
export class SubmissionFormatter {
  constructor(
    private readonly userFormatter: UserFormatter,
    private readonly problemTestCaseFormatter: ProblemTestCasesFormatter,
    private readonly objectStorageService: ObjectStorageService,
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
        outputFile: await this.formatOutputFile(detail),
      })),
    );

    return {
      ...this.format(submissionWithDetails),
      compilationDetail: submissionWithDetails.compilationDetail,
      runDetails,
    };
  }

  private async formatOutputFile(detail: SubmissionRunDetail) {
    if (detail.output.length > 0) {
      return null;
    } else {
      return {
        name: `${detail.testCase.inputFileName}_actual_output.txt`,
        url: await this.objectStorageService.getSignedUrl(detail.outputFileKey),
      };
    }
  }
}
