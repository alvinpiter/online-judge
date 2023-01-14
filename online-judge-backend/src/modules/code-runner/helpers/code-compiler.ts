import { exec } from 'child_process';
import { CompilationError } from '../errors/compilation-error';
import { RunnableCode } from '../runnable-code';

export class CodeCompiler {
  static async compile(
    workingDirectory: string,
    runnableCode: RunnableCode,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!runnableCode.needCompilation()) {
        resolve(true);
      }

      exec(
        runnableCode.compilationCommand(),
        { cwd: workingDirectory },
        (error) => {
          if (error) {
            reject(new CompilationError(error.message));
            return;
          }

          /*
          Ignoring stderr is intended, because compilation warning is written
          to stderr as well.
          */

          resolve(true);
        },
      );
    });
  }
}
