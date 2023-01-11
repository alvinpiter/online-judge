import { Problem } from 'src/modules/problems/entities/problem.entity';
import { User } from 'src/modules/users/user.entity';
import { Submission } from '../entities/submission.entity';

export class SubmissionWithResolvedProperty extends Submission {
  user: User;
  problem: Problem;
}
