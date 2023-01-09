import { IsIn, IsOptional } from 'class-validator';
import { ProblemsOrderOption } from '../entities/problem.entity';

export class UserProblemsGetDto {
  @IsOptional()
  @IsIn(Object.keys(ProblemsOrderOption))
  order = ProblemsOrderOption.BY_ID_ASC;

  @IsOptional()
  offset?: number;

  @IsOptional()
  limit?: number;
}
