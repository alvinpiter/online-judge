import {
  CodeRunResult,
  CodeRunVerdict,
} from 'src/modules/code-runner/interfaces';
import { ProblemTestCaseWithContent } from 'src/modules/problems/interfaces/problem-test-case-with-content';
import {
  SubmissionRunDetail,
  SubmissionRunDetailWithoutId,
} from '../entities/submission-run-detail.entity';
import { SubmissionVerdict } from '../entities/submission.entity';

export function summarizeCodeRunResult(
  submissionId: number,
  problemTestCases: ProblemTestCaseWithContent[],
  codeRunResults: CodeRunResult[],
): {
  verdict: SubmissionVerdict;
  submissionRunDetails: SubmissionRunDetailWithoutId[];
} {
  const submissionRunDetails: SubmissionRunDetailWithoutId[] = [];

  for (let idx = 0; idx < problemTestCases.length; idx++) {
    const { detail } = codeRunResults[idx];

    const submissionRunDetail = new SubmissionRunDetail();
    submissionRunDetail.submissionId = submissionId;
    submissionRunDetail.testCaseId = problemTestCases[idx].id;
    submissionRunDetail.runTimeInMilliseconds = detail.runTimeInMilliseconds;
    submissionRunDetail.memoryUsageInKiloBytes = detail.memoryUsageInKilobytes;
    submissionRunDetail.output = detail.output;
    submissionRunDetail.verdict = getVerdict(
      codeRunResults[idx],
      problemTestCases[idx].output,
    );

    submissionRunDetails.push(submissionRunDetail);
  }

  const firstSubmissionWithNonAcceptedVerdict = submissionRunDetails.find(
    (submissionRunDetail) =>
      submissionRunDetail.verdict !== SubmissionVerdict.ACCEPTED,
  );

  return {
    verdict:
      firstSubmissionWithNonAcceptedVerdict?.verdict ||
      SubmissionVerdict.ACCEPTED,
    submissionRunDetails,
  };
}

function getVerdict(codeRunResult: CodeRunResult, expectedOutput: string) {
  switch (codeRunResult.verdict) {
    case CodeRunVerdict.RUN_TIME_ERROR:
      return SubmissionVerdict.RUN_TIME_ERROR;
    case CodeRunVerdict.TIME_LIMIT_EXCEEDED:
      return SubmissionVerdict.TIME_LIMIT_EXCEEDED;
    default:
      return codeRunResult.detail.output === expectedOutput
        ? SubmissionVerdict.ACCEPTED
        : SubmissionVerdict.WRONG_ANSWER;
  }
}
