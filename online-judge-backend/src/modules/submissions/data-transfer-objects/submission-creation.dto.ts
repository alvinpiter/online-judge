import { Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber } from 'class-validator';
import {
  ProgrammingLanguage,
  SupportedProgrammingLanguages,
} from 'src/constants/programming-languages';

export class SubmissionCreationDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  problemId: number;

  @IsIn(SupportedProgrammingLanguages)
  programmingLanguage: ProgrammingLanguage;

  @IsNotEmpty()
  code: string;
}
