import { ProblemState } from './problem.entity';
import { OffsetPaginationParameter } from '../pagination/offset-pagination.interface';

export interface ProblemsFilterParameter {
  state?: ProblemState;
}

export type ProblemsQueryParameter = ProblemsFilterParameter &
  OffsetPaginationParameter;
