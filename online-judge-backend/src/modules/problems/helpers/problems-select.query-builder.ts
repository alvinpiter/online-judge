import { Repository } from 'typeorm';
import { ProblemsGetDto } from '../data-transfer-objects/problems-get.dto';
import { Problem, ProblemsOrderOption } from '../entities/problem.entity';

export class ProblemsSelectQueryBuilder {
  static build(
    problemsRepository: Repository<Problem>,
    problemsGetDto: ProblemsGetDto,
  ) {
    const qb = problemsRepository.createQueryBuilder('problems').select();

    const { state, ratingGte, ratingLte, order } = problemsGetDto;

    if (state) {
      qb.andWhere('problems.state = :state', { state });
    }

    if (ratingGte) {
      qb.andWhere('problems.rating >= :ratingGte', { ratingGte });
    }

    if (ratingLte) {
      qb.andWhere('problems.rating <= :ratingLte', { ratingLte });
    }

    switch (order) {
      case ProblemsOrderOption.BY_ID_DESC:
        qb.orderBy('id', 'DESC');
        break;
      case ProblemsOrderOption.BY_RATING_ASC:
        qb.orderBy('rating', 'ASC');
        break;
      case ProblemsOrderOption.BY_RATING_DESC:
        qb.orderBy('rating', 'DESC');
        break;
      default:
        qb.orderBy('id', 'ASC');
    }

    return qb;
  }
}
