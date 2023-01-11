import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { ProblemsOrderOption, ProblemState } from '../entities/problem.entity';

export class ProblemsGetDto {
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

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  offset?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  limit?: number;
}
