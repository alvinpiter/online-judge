import { Redis } from 'ioredis';
import { hasValue } from 'src/lib/hasValue';
import { SortedSetData } from './interfaces';
import { zip, chunk } from 'lodash';

// Wraps Redis' sorted set
export class SortedSetService {
  constructor(
    private readonly redisClient: Redis,
    private readonly sortedSetKey: string,
  ) {}

  async upsertMemberScore(member: string, score: number): Promise<number> {
    return this.redisClient.zadd(this.sortedSetKey, score, member);
  }

  async getDataWithRevRanks(members: string[]): Promise<SortedSetData[]> {
    const scores = await this.getMembersScores(members);
    const ranks = await this.getMembersRevRanks(members);

    return zip(members, scores, ranks).map(([member, score, rank]) => ({
      member,
      score,
      rank,
    }));
  }

  async getDataByRevRanks(
    minRank: number,
    maxRank: number,
  ): Promise<SortedSetData[]> {
    // Returns the following structure: [member1, score1, member2, score2, ...]
    const membersAndScores = await this.redisClient.zrevrange(
      this.sortedSetKey,
      minRank,
      maxRank,
      'WITHSCORES',
    );

    return chunk(membersAndScores, 2).map(([member, scoreAsString], idx) => ({
      member,
      score: parseInt(scoreAsString),
      rank: minRank + idx,
    }));
  }

  async getMembersScores(members: string[]): Promise<(number | null)[]> {
    const rawScores: (string | null)[] = await this.redisClient.zmscore(
      this.sortedSetKey,
      members,
    );

    return rawScores.map((rawScore) =>
      hasValue(rawScore) ? parseInt(rawScore) : null,
    );
  }

  async getMembersRevRanks(members: string[]): Promise<(number | null)[]> {
    return Promise.all(
      members.map((member) =>
        this.redisClient.zrevrank(this.sortedSetKey, member),
      ),
    );
  }

  async getSize(): Promise<number> {
    return this.redisClient.zcard(this.sortedSetKey);
  }
}
