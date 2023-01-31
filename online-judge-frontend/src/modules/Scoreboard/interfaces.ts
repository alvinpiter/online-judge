import { OffsetPaginationMeta } from "../Pagination/interfaces";
import { UserProblemAttempt } from "../Problem/interfaces";
import { User } from "../User/interface";

export interface ScoreboardRowScore {
  solveCount: number;
  lastSolveTimeInMilliseconds: number;
}

export interface ScoreboardRow {
  user: User;
  rank: number | null;
  score: ScoreboardRowScore | null;
  userProblemAttempts: UserProblemAttempt[];
}

export interface Scoreboard {
  data: ScoreboardRow[];
  meta: OffsetPaginationMeta;
}
