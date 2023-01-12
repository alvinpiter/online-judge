import { Problem } from 'src/modules/problems/entities/problem.entity';
import { User } from 'src/modules/users/user.entity';
import { Repository } from 'typeorm';
import { SubmissionsGetDto } from '../data-transfer-objects/submissions-get.dto';
import { Submission } from '../entities/submission.entity';

export class SubmissionsSelectQueryBuilder {
  static build(
    submissionsRepository: Repository<Submission>,
    submissionsGetDto: SubmissionsGetDto,
  ) {
    const { userId, problemId, programmingLanguage, verdict } =
      submissionsGetDto;

    const qb = submissionsRepository.createQueryBuilder('submission').select();

    qb.leftJoin(Problem, 'problem', 'submission.problemId = problem.id');
    qb.leftJoin(User, 'user', 'submission.userId = user.id');

    if (userId) {
      qb.andWhere('user.id = :userId', { userId });
    }

    if (problemId) {
      qb.andWhere('problem.id = :problemId', { problemId });
    }

    if (programmingLanguage) {
      qb.andWhere('submission.programmingLanguage = :programmingLanguage', {
        programmingLanguage,
      });
    }

    if (verdict) {
      qb.andWhere('submission.verdict = :verdict', { verdict });
    }

    return qb;
  }
}
