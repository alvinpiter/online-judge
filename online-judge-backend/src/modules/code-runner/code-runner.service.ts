import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ProgrammingLanguage } from 'src/constants/programming-languages';
import { RunnableCodeFactory } from './runnable-code.factory';
import { CodeCompiler } from './helpers/code-compiler';
import { CodeRunner } from './helpers/code-runner';
import { CodeRunCallback, CodeRunOptions, CodeRunResult } from './interfaces';

const WORKING_DIRECTORY_DELETION_DELAY = 10 * 60 * 1000; // 10 minutes

@Injectable()
export class CodeRunnerService {
  async runCode(
    programmingLanguage: ProgrammingLanguage,
    sourceCode: string,
    inputs: string[],
    codeRunCallback: CodeRunCallback = {},
    codeRunOptions?: CodeRunOptions,
  ): Promise<CodeRunResult[]> {
    const { afterOneInputRunCallback, afterAllInputRunCallback } =
      codeRunCallback;

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

    const codeRunResults: CodeRunResult[] = [];

    for (let inputIdx = 0; inputIdx < inputs.length; inputIdx++) {
      const inputFileName = `${inputIdx + 1}.txt`;
      const inputFilePath = path.join(workingDirectory, inputFileName);

      fs.writeFileSync(inputFilePath, inputs[inputIdx]);

      const result = await CodeRunner.run(
        workingDirectory,
        runnableCode,
        inputFileName,
        codeRunOptions,
      );

      codeRunResults.push(result);

      afterOneInputRunCallback &&
        (await afterOneInputRunCallback(inputIdx, result));
    }

    afterAllInputRunCallback && (await afterAllInputRunCallback());

    return codeRunResults;
  }
}
