import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import {
  ProgrammingLanguage,
  SupportedProgrammingLanguages,
} from 'src/constants/programming-languages';
import { OffsetPaginationDto } from 'src/modules/pagination/data-transfer-objects/offset-pagination.dto';
import { SubmissionVerdict } from '../entities/submission.entity';

export class SubmissionsGetDto extends OffsetPaginationDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  userId?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  problemId?: number;

  @IsOptional()
  @IsIn(SupportedProgrammingLanguages)
  programmingLanguage?: ProgrammingLanguage;

  @IsOptional()
  @IsIn(Object.keys(SubmissionVerdict))
  verdict?: SubmissionVerdict;
}
