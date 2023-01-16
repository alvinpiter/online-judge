import { exec } from 'child_process';
import { CodeRunOptions, CodeRunResult, CodeRunVerdict } from '../interfaces';
import { RunnableCode } from '../runnable-code';
import { createCodeRunResult } from './create-code-run-result';

const DEFAULT_TIME_LIMIT_IN_MILLISECONDS = 10 * 1000; // 10 seconds;

export class CodeRunner {
  static async run(
    workingDirectory: string,
    runnableCode: RunnableCode,
    inputFileName: string,
    codeRunOptions?: CodeRunOptions,
  ): Promise<CodeRunResult> {
    const timeLimitInMilliseconds =
      codeRunOptions?.timeLimitInMilliseconds ||
      DEFAULT_TIME_LIMIT_IN_MILLISECONDS;

    const command = `${runnableCode.runCommand()} < ${inputFileName}`;

    // Dummy value for now
    const runTimeInMilliseconds = 0;
    const memoryUsageInKilobytes = 0;

    return new Promise((resolve) => {
      const process = exec(
        command,
        { cwd: workingDirectory, timeout: timeLimitInMilliseconds },
        (error, stdout, stderr) => {
          if (stderr) {
            resolve(
              createCodeRunResult(
                CodeRunVerdict.RUN_TIME_ERROR,
                runTimeInMilliseconds,
                memoryUsageInKilobytes,
                stderr,
              ),
            );
            return;
          }

          if (error) {
            resolve(
              createCodeRunResult(
                CodeRunVerdict.RUN_TIME_ERROR,
                runTimeInMilliseconds,
                memoryUsageInKilobytes,
                error.message,
              ),
            );
            return;
          }

          resolve(
            createCodeRunResult(
              CodeRunVerdict.OK,
              runTimeInMilliseconds,
              memoryUsageInKilobytes,
              stdout,
            ),
          );
        },
      );

      process.on('exit', (_, signal) => {
        if (signal === 'SIGTERM') {
          resolve(
            createCodeRunResult(
              CodeRunVerdict.TIME_LIMIT_EXCEEDED,
              runTimeInMilliseconds,
              memoryUsageInKilobytes,
            ),
          );
          return;
        }
      });
    });
  }
}
