import { CodeRunResult, CodeRunVerdict } from '../code-runner/interfaces';
import { SubmissionVerdict } from './entities/submission.entity';

export function getSubmissionVerdict(
  codeRunResultMap: Map<number, CodeRunResult>,
  expectedOutputs: string[],
) {
  const codeRunResults = Array.from(codeRunResultMap.values());

  const isTLE = codeRunResults.some(
    (result) => result.verdict === CodeRunVerdict.TIME_LIMIT_EXCEEDED,
  );

  if (isTLE) {
    return SubmissionVerdict.TIME_LIMIT_EXCEEDED;
  }

  const isRTE = codeRunResults.some(
    (result) => result.verdict === CodeRunVerdict.RUN_TIME_ERROR,
  );

  if (isRTE) {
    return SubmissionVerdict.RUN_TIME_ERROR;
  }

  const isAccepted = expectedOutputs.every((expectedOutput, idx) => {
    const codeRunResult = codeRunResultMap.get(idx);
    if (codeRunResult && codeRunResult.detail.output === expectedOutput) {
      return true;
    } else {
      return false;
    }
  });

  if (isAccepted) {
    return SubmissionVerdict.ACCEPTED;
  } else {
    return SubmissionVerdict.WRONG_ANSWER;
  }
}
