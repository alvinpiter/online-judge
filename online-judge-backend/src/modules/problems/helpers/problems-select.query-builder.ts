import { Repository, SelectQueryBuilder } from 'typeorm';
import {
  Problem,
  ProblemsOrderOption,
  ProblemState,
} from '../entities/problem.entity';

export class ProblemsSelectQueryBuilder {
  private readonly qb: SelectQueryBuilder<Problem>;

  constructor(problemsRepository: Repository<Problem>) {
    this.qb = problemsRepository.createQueryBuilder('problems').select();
  }

  applyStateFilter(state: ProblemState) {
    this.qb.andWhere('problems.state = :state', {
      state,
    });
  }

  applyOrder(order: ProblemsOrderOption) {
    switch (order) {
      case ProblemsOrderOption.BY_ID_DESC:
        this.qb.orderBy('id', 'DESC');
        break;
      case ProblemsOrderOption.BY_RATING_ASC:
        this.qb.orderBy('rating', 'ASC');
        break;
      case ProblemsOrderOption.BY_RATING_DESC:
        this.qb.orderBy('rating', 'DESC');
        break;
      default:
        this.qb.orderBy('id', 'ASC');
    }
  }

  getQueryBuilder() {
    return this.qb;
  }
}
