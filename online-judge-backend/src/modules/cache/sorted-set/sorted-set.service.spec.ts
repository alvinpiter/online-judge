import { SortedSetService } from './sorted-set.service';
import { Redis } from 'ioredis';

describe(SortedSetService.name, () => {
  const redisClient = Redis.prototype;
  const sortedSetKey = 'sortedSetKey';
  let service: SortedSetService;

  const member1 = 'member1';
  const member2 = 'member2';

  const scoreMap = new Map<string, string>([
    [member1, '1'],
    [member2, '2'],
  ]);

  // higher score, lower rank
  const revRankMap = new Map<string, number>([
    [member2, 0],
    [member1, 1],
  ]);

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
  });

  describe('getMembersWithRevRanks', () => {
    const members: string[] = [member1, 'unknownMember', member2];
    it('returns the correct result', async () => {
      const result = await service.getMembersWithRevRanks(members);

      expect(result).toEqual([
        { member: 'member1', score: 1, rank: 1 },
        { member: 'unknownMember', score: null, rank: null },
        { member: 'member2', score: 2, rank: 0 },
      ]);
    });
  });
});
