import { OffsetPaginationMeta } from 'src/modules/pagination/offset-pagination.interface';
import { Problem } from 'src/modules/problems/entities/problem.entity';
import { UserProblemAttempt } from 'src/modules/problems/entities/user-problem-attempt.entity';
import { User } from 'src/modules/users/user.entity';

export interface ScoreboardRow {
  user: User;
  userProblemAttempts: UserProblemAttempt[];
}

export interface Scoreboard {
  problems: Problem[];

  data: ScoreboardRow[];
  meta: OffsetPaginationMeta;
}
