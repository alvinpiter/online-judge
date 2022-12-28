import { ProgrammingLanguage } from '../general/constants';

export class CreateProblemDto {
  name: string;
  description: string;
}

export class UpdateProblemDto extends CreateProblemDto {}

export class UpsertProblemSolutionTemplateDto {
  programmingLanguage: ProgrammingLanguage;
  template: string;
}
