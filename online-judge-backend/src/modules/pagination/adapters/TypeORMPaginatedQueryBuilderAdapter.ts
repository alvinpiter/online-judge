import { SelectQueryBuilder } from 'typeorm';
import { OffsetPaginationQueryBuilder } from '../offset-pagination.interface';

export class TypeORMPaginatedQueryBuilderAdapter<Entity>
  implements OffsetPaginationQueryBuilder<Entity>
{
  constructor(private readonly qb: SelectQueryBuilder<Entity>) {}

  offset(value: number) {
    this.qb.skip(value);
  }

  limit(value: number) {
    this.qb.take(value);
  }

  async getDataAndTotalCount() {
    return this.qb.getManyAndCount();
  }
}
