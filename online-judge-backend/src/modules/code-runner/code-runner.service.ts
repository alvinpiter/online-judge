import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ProgrammingLanguage } from 'src/constants/programming-languages';
import { RunnableCodeFactory } from './runnable-code.factory';
import { CodeCompiler } from './helpers/code-compiler';
import { CodeRunner } from './helpers/code-runner';
import { CodeRunOptions } from './interfaces';

const WORKING_DIRECTORY_DELETION_DELAY = 10 * 60 * 1000; // 10 minutes

type PostRunCallback = (
  inputIdx: number,
  output: string,
) => Promise<void> | void;

@Injectable()
export class CodeRunnerService {
  async runCode(
    programmingLanguage: ProgrammingLanguage,
    sourceCode: string,
    inputs: string[],
    postRunCallback?: PostRunCallback,
    codeRunOptions?: CodeRunOptions,
  ) {
    const runnableCodeId = uuidv4();
    const runnableCode = RunnableCodeFactory.create(
      runnableCodeId,
      programmingLanguage,
      sourceCode,
    );

    const workingDirectory = path.join(__dirname, 'tmp', runnableCodeId);

    fs.mkdirSync(workingDirectory, { recursive: true });

    setTimeout(
      () => fs.rmSync(workingDirectory, { recursive: true, force: true }),
      WORKING_DIRECTORY_DELETION_DELAY,
    );

    const runnableCodePath = path.join(
      workingDirectory,
      runnableCode.getFileName(),
    );

    fs.writeFileSync(runnableCodePath, runnableCode.getSourceCode());

    await CodeCompiler.compile(workingDirectory, runnableCode);

    let result = '';
    for (let inputIdx = 0; inputIdx < inputs.length; inputIdx++) {
      const input = inputs[inputIdx];
      const output = await CodeRunner.run(
        workingDirectory,
        runnableCode,
        input,
        codeRunOptions,
      );

      postRunCallback && postRunCallback(inputIdx, output);

      result += output;
    }

    return result;
  }
}
