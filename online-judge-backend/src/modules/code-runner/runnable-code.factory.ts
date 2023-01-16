import { ProgrammingLanguage } from 'src/constants/programming-languages';
import { RunnableCode } from './runnable-code';
import { Cpp11Code } from './runnable-codes/cpp-11-code';
import { JavascriptCode } from './runnable-codes/javascript-code';
import { Python3Code } from './runnable-codes/python-3-code';

export class RunnableCodeFactory {
  static create(
    identifier: string,
    programmingLanguage: ProgrammingLanguage,
    sourceCode: string,
  ): RunnableCode {
    switch (programmingLanguage) {
      case ProgrammingLanguage.JAVASCRIPT:
        return new JavascriptCode(identifier, sourceCode);
      case ProgrammingLanguage.PYTHON_3:
        return new Python3Code(identifier, sourceCode);
      case ProgrammingLanguage.CPP_11:
        return new Cpp11Code(identifier, sourceCode);
      default:
        throw new Error('Unknown programming language');
    }
  }
}
