import { Injectable } from '@nestjs/common';
import {
  OffsetPaginationParameter,
  OffsetPaginationQueryBuilder,
  OffsetPaginationResult,
} from './offset-pagination.interface';

@Injectable()
export class OffsetPaginationService {
  async paginate<DataType>(
    queryBuilder: OffsetPaginationQueryBuilder<DataType>,
    paginationParameter: OffsetPaginationParameter,
  ): Promise<OffsetPaginationResult<DataType>> {
    const { offset, limit } = paginationParameter;

    queryBuilder.offset(offset);
    queryBuilder.limit(limit);

    const [data, total] = await queryBuilder.getDataAndTotalCount();

    return {
      data,
      meta: { offset, limit, total },
    };
  }
}
