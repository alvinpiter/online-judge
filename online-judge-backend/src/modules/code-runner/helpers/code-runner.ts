import { exec } from 'child_process';
import { RunTimeError } from '../errors/run-time-error';
import { RunnableCode } from '../runnable-code';

export class CodeRunner {
  static async run(
    workingDirectory: string,
    runnableCode: RunnableCode,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(
        runnableCode.runCommand(),
        { cwd: workingDirectory },
        (error, stdout, stderr) => {
          if (error) {
            reject(new RunTimeError(error.message));
          }

          if (stderr) {
            reject(new RunTimeError(stderr));
          }

          resolve(stdout);
        },
      );
    });
  }
}
