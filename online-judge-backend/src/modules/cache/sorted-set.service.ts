import { Redis } from 'ioredis';

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

  async upsertMemberScore(
    memberIdentifier: string,
    score: number,
  ): Promise<number> {
    return this.redisClient.zadd(this.sortedSetKey, score, memberIdentifier);
  }

  async getMemberRank(memberIdentifier: string): Promise<number | null> {
    return this.redisClient.zrevrank(this.sortedSetKey, memberIdentifier);
  }

  async getMembersByRankRange(
    minRank: number,
    maxRank: number,
  ): Promise<string[]> {
    return this.redisClient.zrange(this.sortedSetKey, minRank, maxRank);
  }

  async getSize(): Promise<number> {
    return this.redisClient.zcard(this.sortedSetKey);
  }
}
