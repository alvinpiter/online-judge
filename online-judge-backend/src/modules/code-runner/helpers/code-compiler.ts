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
        (error, _, stderr) => {
          if (error) {
            reject(new CompilationError(error.message));
          }

          if (stderr) {
            reject(new CompilationError(stderr));
          }

          resolve(true);
        },
      );
    });
  }
}
