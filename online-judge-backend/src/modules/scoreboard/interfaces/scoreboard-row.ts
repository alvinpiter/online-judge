import { UserProblemAttempt } from 'src/modules/problems/entities/user-problem-attempt.entity';
import { User } from 'src/modules/users/user.entity';

export interface ScoreboardRow {
  user: User;
  userProblemAttempts: UserProblemAttempt[];
}
