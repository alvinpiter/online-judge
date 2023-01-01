import { ProblemState } from './problem.entity';

export interface ProblemsFilterParameter {
  state?: ProblemState;
}

export enum ProblemsOrderOption {
  BY_ID_ASC = 'BY_ID_ASC',
  BY_ID_DESC = 'BY_ID_DESC',
  BY_RATING_ASC = 'BY_RATING_ASC',
  BY_RATING_DESC = 'BY_RATING_DESC',
}
