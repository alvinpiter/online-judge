import { Redis } from 'ioredis';
import { hasValue } from 'src/lib/hasValue';
import { SortedSetData } from './interfaces';
import { zip } from 'lodash';

export class SortedSetService {
  constructor(
    private readonly redisClient: Redis,
    private readonly sortedSetKey: string,
  ) {}

  async upsertMemberScore(member: string, score: number): Promise<number> {
    return this.redisClient.zadd(this.sortedSetKey, score, member);
  }

  async getMembersWithRevRanks(members: string[]): Promise<SortedSetData[]> {
    const scores = await this.getMembersScores(members);
    const ranks = await this.getMembersRevRanks(members);

    return zip(members, scores, ranks).map(([member, score, rank]) => ({
      member,
      score,
      rank,
    }));
  }

  async getMembersByRevRanks(
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
