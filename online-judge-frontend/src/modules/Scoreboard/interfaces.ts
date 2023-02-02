import { OffsetPaginationMeta } from "../Pagination/interfaces";
import { UserProblemAttempt } from "../Problem/interfaces";
import { User } from "../User/interface";

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

export interface Scoreboard {
  data: ScoreboardRow[];
  meta: OffsetPaginationMeta;
}

export interface ScoreboardFilter {
  userIds?: string; // Example: 2,3,5,7
}
