import { ProgrammingLanguage } from 'src/constants/programming-languages';
import { RunnableCode } from '../runnable-code';

export class JavascriptCode extends RunnableCode {
  constructor(identifier: string, sourceCode: string) {
    super(identifier, ProgrammingLanguage.JAVASCRIPT, sourceCode);
  }

  needCompilation(): boolean {
    return false;
  }

  compilationCommand(): string {
    return '';
  }

  runCommand(): string {
    return `node ${this.getFileName()}`;
  }

  getFileExtension(): string {
    return '.js';
  }
}
