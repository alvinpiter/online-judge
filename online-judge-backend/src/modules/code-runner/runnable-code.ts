import { ProgrammingLanguage } from 'src/constants/programming-languages';

export abstract class RunnableCode {
  constructor(
    protected readonly identifier: string,
    protected readonly programmingLanguage: ProgrammingLanguage,
    protected readonly sourceCode: string,
  ) {}

  abstract getFileExtension(): string;
  abstract needCompilation(): boolean;
  abstract compilationCommand(): string;
  abstract runCommand(): string;

  getFileName() {
    return `${this.identifier}${this.getFileExtension()}`;
  }

  getProgrammingLanguage() {
    return this.programmingLanguage;
  }

  getSourceCode() {
    return this.sourceCode;
  }
}
