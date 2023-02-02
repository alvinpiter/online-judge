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
  private _offset = 0;
  private _limit = 25;

  constructor(
    private readonly sortedSetService: SortedSetService,
    private readonly order = SortedSetOrder.SCORE_DESC,
  ) {}

  addMemberFilter(member: string) {
    this.membersFilter.push(member);
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
          ? await this.sortedSetService.getDataWithRevRanks(this.membersFilter)
          : await this.sortedSetService.getDataWithRanks(this.membersFilter);

      const totalCount = data.length;

      data.sort((first, second) => first.rank - second.rank);

      return [data, totalCount] as [SortedSetData[], number];
    } else {
      const minRank = this._offset;
      const maxRank = minRank + this._limit - 1;

      const data =
        this.order === SortedSetOrder.SCORE_DESC
          ? await this.sortedSetService.getDataByRevRanks(minRank, maxRank)
          : await this.sortedSetService.getDataByRanks(minRank, maxRank);

      const totalCount = await this.sortedSetService.getSize();

      return [data, totalCount] as [SortedSetData[], number];
    }
  }
}
