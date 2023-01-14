import { exec } from 'child_process';
import { RunTimeError } from '../errors/run-time-error';
import { TimeLimitExceededError } from '../errors/time-limit-exceeded-error';
import { CodeRunOptions } from '../interfaces';
import { RunnableCode } from '../runnable-code';

const DEFAULT_TIME_LIMIT_IN_MILLISECONDS = 10 * 1000; // 10 seconds;

export class CodeRunner {
  static async run(
    workingDirectory: string,
    runnableCode: RunnableCode,
    codeRunOptions?: CodeRunOptions,
  ): Promise<string> {
    const timeLimitInMilliseconds =
      codeRunOptions && codeRunOptions.timeLimitInMilliseconds
        ? codeRunOptions.timeLimitInMilliseconds
        : DEFAULT_TIME_LIMIT_IN_MILLISECONDS;

    return new Promise((resolve, reject) => {
      const process = exec(
        runnableCode.runCommand(),
        { cwd: workingDirectory, timeout: timeLimitInMilliseconds },
        (error, stdout, stderr) => {
          if (stderr) {
            reject(new RunTimeError(stderr));
            return;
          }

          if (error) {
            reject(new RunTimeError(error.message));
            return;
          }

          resolve(stdout);
        },
      );

      process.on('exit', (_, signal) => {
        if (signal === 'SIGTERM') {
          reject(new TimeLimitExceededError());
          return;
        }
      });
    });
  }
}
