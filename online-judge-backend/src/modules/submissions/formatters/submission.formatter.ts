import { Injectable } from '@nestjs/common';
import { UserFormatter } from 'src/modules/users/formatters/user.formatter';
import { SubmissionWithResolvedProperty } from '../interfaces/submission-with-resolved-property';

@Injectable()
export class SubmissionFormatter {
  constructor(private readonly userFormatter: UserFormatter) {}

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
}
