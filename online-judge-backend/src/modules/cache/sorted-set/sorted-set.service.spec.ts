import { SortedSetService } from './sorted-set.service';
import { Redis } from 'ioredis';

describe(SortedSetService.name, () => {
  const redisClient = Redis.prototype;
  const sortedSetKey = 'sortedSetKey';
  let service: SortedSetService;

  const membersWithScores: { member: string; score: string }[] = [
    { member: 'member1', score: '1' },
    { member: 'member2', score: '2' },
  ];

  // Sorted in non-increasing order of scores
  const sortedMembersWithScoresDesc = membersWithScores
    .slice(0, membersWithScores.length)
    .sort((first, second) => parseInt(second.score) - parseInt(first.score));

  const sortedMembersWithScoresAsc = membersWithScores
    .slice(0, membersWithScores.length)
    .sort((first, second) => parseInt(first.score) - parseInt(second.score));

  const scoreMap = new Map<string, string>(
    membersWithScores.map((memberWithScore) => [
      memberWithScore.member,
      memberWithScore.score,
    ]),
  );

  const revRankMap = new Map<string, number>(
    sortedMembersWithScoresDesc.map((memberWithScore, idx) => [
      memberWithScore.member,
      idx,
    ]),
  );

  const getRangeResult = (
    rankedData: { member: string; score: string }[],
    minRank: number,
    maxRank: number,
  ): string[] => {
    const resolvedMinRank = Math.max(0, minRank);
    const resolvedMaxRank = Math.min(rankedData.length - 1, maxRank);

    const result: string[] = [];
    for (let idx = resolvedMinRank; idx <= resolvedMaxRank; idx++) {
      result.push(rankedData[idx].member);
      result.push(rankedData[idx].score);
    }

    return result;
  };

  beforeEach(() => {
    service = new SortedSetService(redisClient, sortedSetKey);

    jest
      .spyOn(redisClient, 'zmscore')
      .mockImplementation(async (_sortedSetKey, members) => {
        return members.map((member: string) =>
          scoreMap.has(member) ? scoreMap.get(member) : null,
        );
      });

    jest
      .spyOn(redisClient, 'zrevrank')
      .mockImplementation(async (_sortedSetKey, member: string) =>
        revRankMap.has(member) ? revRankMap.get(member) : null,
      );

    jest
      .spyOn(redisClient, 'zrevrange')
      .mockImplementation(async (_sortedSetKey, start: number, stop: number) =>
        getRangeResult(sortedMembersWithScoresDesc, start, stop),
      );

    jest
      .spyOn(redisClient, 'zrange')
      .mockImplementation(async (_sortedSetKey, start: number, stop: number) =>
        getRangeResult(sortedMembersWithScoresAsc, start, stop),
      );
  });

  describe('getDataWithRevRanks', () => {
    it('returns the correct result', async () => {
      const members = ['member1', 'unknownMember', 'member2'];
      const result = await service.getDataWithRevRanks(members);

      expect(redisClient.zmscore).toHaveBeenCalledWith(sortedSetKey, members);
      for (const member of members) {
        expect(redisClient.zrevrank).toHaveBeenCalledWith(sortedSetKey, member);
      }
      expect(result).toEqual([
        { member: 'member1', score: 1, rank: 1 },
        { member: 'unknownMember', score: null, rank: null },
        { member: 'member2', score: 2, rank: 0 },
      ]);
    });
  });

  describe('getDataByRevRanks', () => {
    it('returns the correct result', async () => {
      const result = await service.getDataByRevRanks(0, 2); // Intentionally set out of range

      expect(redisClient.zrevrange).toHaveBeenCalledWith(
        sortedSetKey,
        0,
        2,
        'WITHSCORES',
      );
      expect(result).toEqual([
        { member: 'member2', score: 2, rank: 0 },
        { member: 'member1', score: 1, rank: 1 },
      ]);
    });
  });

  describe('getDataByRanks', () => {
    it('returns the correct result', async () => {
      const result = await service.getDataByRanks(0, 2); // Intentionally set out of range

      expect(redisClient.zrange).toHaveBeenCalledWith(
        sortedSetKey,
        0,
        2,
        'WITHSCORES',
      );
      expect(result).toEqual([
        { member: 'member1', score: 1, rank: 0 },
        { member: 'member2', score: 2, rank: 1 },
      ]);
    });
  });
});
