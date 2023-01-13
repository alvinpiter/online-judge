import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { OffsetPaginationDto } from 'src/modules/pagination/data-transfer-objects/offset-pagination.dto';
import { ProblemsOrderOption, ProblemState } from '../entities/problem.entity';

export class ProblemsGetDto extends OffsetPaginationDto {
  @IsOptional()
  @IsIn(Object.keys(ProblemState))
  state?: ProblemState;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  ratingGte?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  ratingLte?: number;

  @IsOptional()
  @IsIn(Object.keys(ProblemsOrderOption))
  order = ProblemsOrderOption.BY_ID_ASC;
}
