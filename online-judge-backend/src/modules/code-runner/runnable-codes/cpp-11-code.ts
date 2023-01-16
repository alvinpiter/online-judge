import { ProgrammingLanguage } from 'src/constants/programming-languages';
import { RunnableCode } from '../runnable-code';

export class Cpp11Code extends RunnableCode {
  constructor(identifier: string, sourceCode: string) {
    super(identifier, ProgrammingLanguage.CPP_11, sourceCode);
  }

  needCompilation(): boolean {
    return true;
  }

  compilationCommand(): string {
    return `g++ -std=c++11 ${this.getFileName()} -o ${this.identifier}`;
  }

  runCommand(): string {
    return `./${this.identifier}`;
  }

  getFileExtension(): string {
    return '.cpp';
  }
}
