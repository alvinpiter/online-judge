import { OffsetPaginationQueryBuilder } from 'src/modules/pagination/offset-pagination.interface';
import { SortedSetService } from './sorted-set.service';
import { SortedSetData } from './interfaces';

export class SortedSetPaginatedQueryBuilder
  implements OffsetPaginationQueryBuilder<SortedSetData>
{
  private membersFilter: string[] = [];
  private _offset = 0;
  private _limit = 25;

  constructor(private readonly sortedSetService: SortedSetService) {}

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
      const data = await this.sortedSetService.getMembers(this.membersFilter);
      const totalCount = data.length;

      return [data, totalCount] as [SortedSetData[], number];
    } else {
      const minRank = this._offset;
      const maxRank = minRank + this._limit - 1;

      const data = await this.sortedSetService.getMembersByRank(
        minRank,
        maxRank,
      );
      const totalCount = await this.sortedSetService.getSize();

      return [data, totalCount] as [SortedSetData[], number];
    }
  }
}
