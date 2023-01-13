import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ProgrammingLanguage } from 'src/constants/programming-languages';
import { RunnableCodeFactory } from './runnable-code.factory';

@Injectable()
export class CodeRunnerService {
  runCode(programmingLanguage: ProgrammingLanguage, sourceCode: string) {
    const runnableCode = RunnableCodeFactory.create(
      uuidv4(),
      programmingLanguage,
      sourceCode,
    );

    console.log({
      fileName: runnableCode.getFileName(),
      needCompilation: runnableCode.needCompilation(),
      compilationCommand: runnableCode.compilationCommand(),
      runCommand: runnableCode.runCommand(),
    });
  }
}
