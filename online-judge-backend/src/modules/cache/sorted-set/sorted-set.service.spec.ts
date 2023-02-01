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

  const membersWithScoresInNonIncreasingOrderOfScores = membersWithScores
    .slice(0, membersWithScores.length)
    .sort((first, second) => parseInt(second.score) - parseInt(first.score));

  const scoreMap = new Map<string, string>(
    membersWithScores.map((memberWithScore) => [
      memberWithScore.member,
      memberWithScore.score,
    ]),
  );

  const revRankMap = new Map<string, number>(
    membersWithScoresInNonIncreasingOrderOfScores.map(
      (memberWithScore, idx) => [memberWithScore.member, idx],
    ),
  );

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
      .mockImplementation(
        async (_sortedSetKey, start: number, stop: number) => {
          const resolvedStart = Math.max(start, 0);
          const resolvedStop = Math.min(
            stop,
            membersWithScoresInNonIncreasingOrderOfScores.length - 1,
          );
          const result = [];
          for (let idx = resolvedStart; idx <= resolvedStop; idx++) {
            result.push(
              membersWithScoresInNonIncreasingOrderOfScores[idx].member,
            );
            result.push(
              membersWithScoresInNonIncreasingOrderOfScores[idx].score,
            );
          }

          return result;
        },
      );
  });

  describe('getMembersWithRevRanks', () => {
    it('returns the correct result', async () => {
      const result = await service.getMembersWithRevRanks([
        'member1',
        'unknownMember',
        'member2',
      ]);

      expect(result).toEqual([
        { member: 'member1', score: 1, rank: 1 },
        { member: 'unknownMember', score: null, rank: null },
        { member: 'member2', score: 2, rank: 0 },
      ]);
    });
  });

  describe('getMembersByRevRanks', () => {
    it('returns the correct result', async () => {
      const result = await service.getMembersByRevRanks(0, 2); // Intentionally set out of range

      expect(result).toEqual([
        { member: 'member2', score: 2, rank: 0 },
        { member: 'member1', score: 1, rank: 1 },
      ]);
    });
  });
});
