import { CodeRunResult, CodeRunVerdict } from '../interfaces';

export function createCodeRunResult(
  verdict: CodeRunVerdict,
  runTimeInMilliseconds: number,
  memoryUsageInKilobytes: number,
  output?: string,
): CodeRunResult {
  return {
    verdict,
    detail: {
      runTimeInMilliseconds,
      memoryUsageInKilobytes,
      output,
    },
  };
}
