import { SortedSetService } from './sorted-set.service';
import { Redis } from 'ioredis';
import { RedisSortedSetData } from './interfaces';

describe(SortedSetService.name, () => {
  const redisClient = Redis.prototype;
  const sortedSetKey = 'sortedSetKey';
  let service: SortedSetService;

  beforeEach(() => {
    service = new SortedSetService(redisClient, sortedSetKey);
  });

  describe('getMembers', () => {
    const members = ['user:1', 'user:2', 'user:3'];
    const expectedResult: RedisSortedSetData[] = [
      { member: 'user:1', score: null, rank: null },
      { member: 'user:2', score: 2, rank: 1 },
      { member: 'user:3', score: 1, rank: 2 },
    ];

    it('returns the correct result', async () => {
      jest.spyOn(redisClient, 'zmscore').mockResolvedValue([null, '2', '1']);
      jest
        .spyOn(redisClient, 'zrevrank')
        .mockImplementation(async (key, member) => {
          return expectedResult.find((result) => result.member === member).rank;
        });

      const result = await service.getMembers(members);

      expect(redisClient.zmscore).toHaveBeenCalledWith(sortedSetKey, members);
      for (const member of members) {
        expect(redisClient.zrevrank).toHaveBeenCalledWith(sortedSetKey, member);
      }
      expect(result).toEqual(expectedResult);
    });
  });
});
