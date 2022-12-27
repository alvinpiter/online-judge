import { ProgrammingLanguage } from '../general/constants';

export class CreateProblemDto {
  name: string;
  description: string;
}

export class UpsertProblemSolutionTemplateDto {
  language: ProgrammingLanguage;
  template: string;
}
