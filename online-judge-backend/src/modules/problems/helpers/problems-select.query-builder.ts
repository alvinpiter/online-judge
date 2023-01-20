import { Repository } from 'typeorm';
import { ProblemsGetDto } from '../data-transfer-objects/problems-get.dto';
import { ProblemStatistics } from '../entities/problem-statistics.entity';
import { Problem, ProblemsOrderOption } from '../entities/problem.entity';

export class ProblemsSelectQueryBuilder {
  static build(
    problemsRepository: Repository<Problem>,
    problemsGetDto: ProblemsGetDto,
  ) {
    const qb = problemsRepository.createQueryBuilder('problem').select();

    qb.leftJoinAndSelect(
      ProblemStatistics,
      'problemStatistics',
      'problemStatistics.problemId = problem.id',
    );

    const { state, ratingGte, ratingLte, order } = problemsGetDto;

    if (state) {
      qb.andWhere('problem.state = :state', { state });
    }

    if (ratingGte) {
      qb.andWhere('problem.rating >= :ratingGte', { ratingGte });
    }

    if (ratingLte) {
      qb.andWhere('problem.rating <= :ratingLte', { ratingLte });
    }

    switch (order) {
      case ProblemsOrderOption.BY_ID_DESC:
        qb.orderBy('problem.id', 'DESC');
        break;
      case ProblemsOrderOption.BY_RATING_ASC:
        qb.orderBy('problem.rating', 'ASC');
        break;
      case ProblemsOrderOption.BY_RATING_DESC:
        qb.orderBy('problem.rating', 'DESC');
        break;
      case ProblemsOrderOption.BY_SOLVER_COUNT_ASC:
        qb.orderBy('problemStatistics.solverCount', 'ASC');
        break;
      case ProblemsOrderOption.BY_SOLVER_COUNT_DESC:
        qb.orderBy('problemStatistics.solverCount', 'DESC');
        break;
      default:
        qb.orderBy('problem.id', 'ASC');
    }

    return qb;
  }
}
