import { UserProblemAttempt } from 'src/modules/problems/entities/user-problem-attempt.entity';
import { User } from 'src/modules/users/user.entity';

// TODO: What if the user doesn't have accepted solution yet?
export interface ScoreboardScoringSchema {
  solveCount: number;
  lastSolveTimeInMilliseconds: number;
}

export interface ScoreboardRow {
  user: User;
  rank: number | null;
  numericScore: number | null;
  schematicScore: ScoreboardScoringSchema | null;
  userProblemAttempts: UserProblemAttempt[];
}
