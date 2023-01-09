import { IsIn } from 'class-validator';
import {
  ProgrammingLanguage,
  SupportedProgrammingLanguages,
} from 'src/constants/programming-languages';

export class ProblemSolutionTemplateUpsertDto {
  @IsIn(SupportedProgrammingLanguages)
  programmingLanguage: ProgrammingLanguage;

  template: string;
}
