import { OffsetPaginationMeta } from "../Pagination/interfaces";
import { Problem, UserProblemAttempt } from "../Problem/interfaces";
import { User } from "../User/interface";

export interface ScoreboardRow {
  user: User;
  userProblemAttempts: UserProblemAttempt[];
}

export interface Scoreboard {
  problems: Problem[];

  data: ScoreboardRow[];
  metadata: OffsetPaginationMeta;
}
