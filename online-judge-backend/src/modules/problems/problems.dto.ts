import { ProgrammingLanguage } from '../general/constants';
import { ProblemState } from './problem.entity';

export class CreateProblemDto {
  name: string;
  description: string;
  rating: number;
}

export class UpdateProblemDto extends CreateProblemDto {}

export class UpsertProblemSolutionTemplateDto {
  programmingLanguage: ProgrammingLanguage;
  template: string;
}

export interface GetProblemsQueryParameter {
  state?: ProblemState;

  offset?: number;
  limit?: number;
}
