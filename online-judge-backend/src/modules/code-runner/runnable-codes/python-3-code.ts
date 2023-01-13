import { ProgrammingLanguage } from 'src/constants/programming-languages';
import { RunnableCode } from '../runnable-code';

export class Python3Code extends RunnableCode {
  constructor(identifier: string, sourceCode: string) {
    super(identifier, ProgrammingLanguage.PYTHON_3, sourceCode);
  }

  needCompilation(): boolean {
    return false;
  }

  compilationCommand(): string {
    return '';
  }

  runCommand(): string {
    return `python3 ${this.getFileName()}`;
  }

  getFileExtension(): string {
    return '.py';
  }
}
