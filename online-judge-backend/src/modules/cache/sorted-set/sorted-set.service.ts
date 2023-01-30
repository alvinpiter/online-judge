import { Redis } from 'ioredis';
import { hasValue } from 'src/lib/hasValue';
import { SortedSetData } from './interfaces';

/*
Maintain a set of members with its scores, where the scores are sorted
in non-increasing order. The member with the largest score will have the best rank.

Rank starts from 0.
*/
export class SortedSetService {
  constructor(
    private readonly redisClient: Redis,
    private readonly sortedSetKey: string,
  ) {}

  async upsertMemberScore(member: string, score: number): Promise<number> {
    return this.redisClient.zadd(this.sortedSetKey, score, member);
  }

  async getMembers(members: string[]): Promise<SortedSetData[]> {
    const scores: (string | null)[] = await this.redisClient.zmscore(
      this.sortedSetKey,
      members,
    );

    const ranks: (number | null)[] = await Promise.all(
      members.map((member) =>
        this.redisClient.zrevrank(this.sortedSetKey, member),
      ),
    );

    return members.map((member, idx) => {
      if (!hasValue(ranks[idx]) || !hasValue(scores[idx])) {
        return {
          member,
          score: null,
          rank: null,
        };
      } else {
        return {
          member,
          score: parseInt(scores[idx]),
          rank: ranks[idx],
        };
      }
    });
  }

  async getMembersByRank(
    minRank: number,
    maxRank: number,
  ): Promise<SortedSetData[]> {
    const membersAndScores = await this.redisClient.zrevrange(
      this.sortedSetKey,
      minRank,
      maxRank,
      'WITHSCORES',
    );

    const result: SortedSetData[] = [];
    for (
      let idx = 0, currentRank = minRank;
      idx < membersAndScores.length;
      idx += 2, currentRank += 1
    ) {
      result.push({
        member: membersAndScores[idx],
        score: parseInt(membersAndScores[idx + 1]),
        rank: currentRank,
      });
    }

    return result;
  }

  async getMembersByRankRange(
    minRank: number,
    maxRank: number,
  ): Promise<string[]> {
    return this.redisClient.zrevrange(this.sortedSetKey, minRank, maxRank);
  }

  async getSize(): Promise<number> {
    return this.redisClient.zcard(this.sortedSetKey);
  }
}
