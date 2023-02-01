import { SortedSetData } from './interfaces';
import {
  SortedSetOrder,
  SortedSetPaginatedQueryBuilder,
} from './sorted-set-paginated-query-builder';
import { SortedSetService } from './sorted-set.service';

describe(SortedSetPaginatedQueryBuilder.name, () => {
  const sortedSetService = SortedSetService.prototype;

  const sortedSetDataRev: SortedSetData[] = [
    { member: 'member2', score: 2, rank: 0 },
    { member: 'member1', score: 1, rank: 1 },
  ];

  const sortedSetData: SortedSetData[] = [
    { member: 'member1', score: 1, rank: 0 },
    { member: 'member2', score: 2, rank: 1 },
  ];

  describe('getDataAndTotalCount', () => {
    describe('when order is SCORE_DESC', () => {
      describe('when there is membersFilter', () => {
        const builder = new SortedSetPaginatedQueryBuilder(sortedSetService);
        builder.addMemberFilter(sortedSetDataRev[0].member);

        it('returns the correct result', async () => {
          jest
            .spyOn(sortedSetService, 'getDataWithRevRanks')
            .mockResolvedValue([sortedSetDataRev[0]]);

          const result = await builder.getDataAndTotalCount();

          expect(sortedSetService.getDataWithRevRanks).toHaveBeenCalledWith([
            sortedSetDataRev[0].member,
          ]);
          expect(result).toEqual([[sortedSetDataRev[0]], 1]);
        });
      });

      describe('when there is no membersFilter', () => {
        const builder = new SortedSetPaginatedQueryBuilder(sortedSetService);
        builder.offset(42);
        builder.limit(10);

        it('returns the correct result', async () => {
          jest
            .spyOn(sortedSetService, 'getDataByRevRanks')
            .mockResolvedValue(sortedSetDataRev);

          jest.spyOn(sortedSetService, 'getSize').mockResolvedValue(100);

          const result = await builder.getDataAndTotalCount();

          expect(sortedSetService.getDataByRevRanks).toHaveBeenCalledWith(
            42,
            51,
          );
          expect(result).toEqual([sortedSetDataRev, 100]);
        });
      });
    });

    describe('when order is SCORE_ASC', () => {
      describe('when there is membersFilter', () => {
        const builder = new SortedSetPaginatedQueryBuilder(
          sortedSetService,
          SortedSetOrder.SCORE_ASC,
        );
        builder.addMemberFilter(sortedSetData[0].member);

        it('returns the correct result', async () => {
          jest
            .spyOn(sortedSetService, 'getDataWithRanks')
            .mockResolvedValue([sortedSetData[0]]);

          const result = await builder.getDataAndTotalCount();

          expect(sortedSetService.getDataWithRanks).toHaveBeenCalledWith([
            sortedSetData[0].member,
          ]);
          expect(result).toEqual([[sortedSetData[0]], 1]);
        });
      });

      describe('when there is no membersFilter', () => {
        const builder = new SortedSetPaginatedQueryBuilder(
          sortedSetService,
          SortedSetOrder.SCORE_ASC,
        );
        builder.offset(42);
        builder.limit(10);

        it('returns the correct result', async () => {
          jest
            .spyOn(sortedSetService, 'getDataByRanks')
            .mockResolvedValue(sortedSetData);

          jest.spyOn(sortedSetService, 'getSize').mockResolvedValue(100);

          const result = await builder.getDataAndTotalCount();

          expect(sortedSetService.getDataByRanks).toHaveBeenCalledWith(42, 51);
          expect(result).toEqual([sortedSetData, 100]);
        });
      });
    });
  });
});
