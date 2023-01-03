import { IsIn, IsOptional } from 'class-validator';
import { ProblemsOrderOption, ProblemState } from '../entities/problem.entity';

export class ProblemsGetDto {
  @IsOptional()
  @IsIn(Object.keys(ProblemState))
  state?: ProblemState;

  @IsOptional()
  @IsIn(Object.keys(ProblemsOrderOption))
  order = ProblemsOrderOption.BY_ID_ASC;

  @IsOptional()
  offset?: number;

  @IsOptional()
  limit?: number;
}
