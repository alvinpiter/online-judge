import { Problem } from 'src/modules/problems/entities/problem.entity';

export interface UserStatistics {
  rank: number | null;
  solvedProblems: Problem[];
  attemptedProblems: Problem[];
}
