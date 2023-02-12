import { OffsetPaginationQueryBuilder } from 'src/modules/pagination/offset-pagination.interface';
import { SortedSetService } from './sorted-set.service';
import { SortedSetData } from './interfaces';

export enum SortedSetOrder {
  SCORE_DESC = 'SCORE_DESC',
  SCORE_ASC = 'SCORE_ASC',
}

export class SortedSetPaginatedQueryBuilder
  implements OffsetPaginationQueryBuilder<SortedSetData>
{
  private membersFilter: string[] = [];
  private order = SortedSetOrder.SCORE_DESC;
  private _offset = 0;
  private _limit = 25;

  constructor(
    private readonly sortedSetService: SortedSetService,
    private readonly sortedSetKey: string,
  ) {}

  addMemberFilter(member: string) {
    this.membersFilter.push(member);
  }

  setOrder(order: SortedSetOrder) {
    this.order = order;
  }

  offset(value: number) {
    this._offset = value;
  }

  limit(value: number) {
    this._limit = value;
  }

  async getDataAndTotalCount() {
    if (this.membersFilter.length > 0) {
      const data =
        this.order === SortedSetOrder.SCORE_DESC
          ? await this.sortedSetService.getDataWithRevRanks(
              this.sortedSetKey,
              this.membersFilter,
            )
          : await this.sortedSetService.getDataWithRanks(
              this.sortedSetKey,
              this.membersFilter,
            );

      const totalCount = data.length;

      data.sort((first, second) => first.rank - second.rank);

      return [data, totalCount] as [SortedSetData[], number];
    } else {
      const minRank = this._offset;
      const maxRank = minRank + this._limit - 1;

      const data =
        this.order === SortedSetOrder.SCORE_DESC
          ? await this.sortedSetService.getDataByRevRanks(
              this.sortedSetKey,
              minRank,
              maxRank,
            )
          : await this.sortedSetService.getDataByRanks(
              this.sortedSetKey,
              minRank,
              maxRank,
            );

      const totalCount = await this.sortedSetService.getSize(this.sortedSetKey);

      return [data, totalCount] as [SortedSetData[], number];
    }
  }
}
