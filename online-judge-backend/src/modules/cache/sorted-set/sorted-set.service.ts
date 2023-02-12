import { Redis } from 'ioredis';
import { hasValue } from 'src/lib/hasValue';
import { SortedSetData } from './interfaces';
import { zip, chunk } from 'lodash';

type NullableNumber = number | null;

// Wraps Redis' sorted set
export class SortedSetService {
  constructor(private readonly redisClient: Redis) {}

  async upsertMemberScore(
    sortedSetKey: string,
    member: string,
    score: number,
  ): Promise<number> {
    return this.redisClient.zadd(sortedSetKey, score, member);
  }

  async getDataWithRevRanks(
    sortedSetKey: string,
    members: string[],
  ): Promise<SortedSetData[]> {
    const scores = await this.getMembersScores(sortedSetKey, members);
    const ranks = await this.getMembersRevRanks(sortedSetKey, members);

    return this.zipMembersScoresRanksToSortedData(members, scores, ranks);
  }

  async getDataWithRanks(
    sortedSetKey: string,
    members: string[],
  ): Promise<SortedSetData[]> {
    const scores = await this.getMembersScores(sortedSetKey, members);
    const ranks = await this.getMembersRanks(sortedSetKey, members);

    return this.zipMembersScoresRanksToSortedData(members, scores, ranks);
  }

  async getDataByRevRanks(
    sortedSetKey: string,
    minRank: number,
    maxRank: number,
  ): Promise<SortedSetData[]> {
    // Returns the following structure: [member1, score1, member2, score2, ...]
    const membersAndScores = await this.redisClient.zrevrange(
      sortedSetKey,
      minRank,
      maxRank,
      'WITHSCORES',
    );

    return this.membersAndScoresToSortedData(membersAndScores, minRank);
  }

  async getDataByRanks(
    sortedSetKey: string,
    minRank: number,
    maxRank: number,
  ): Promise<SortedSetData[]> {
    // Returns the following structure: [member1, score1, member2, score2, ...]
    const membersAndScores = await this.redisClient.zrange(
      sortedSetKey,
      minRank,
      maxRank,
      'WITHSCORES',
    );

    return this.membersAndScoresToSortedData(membersAndScores, minRank);
  }

  async getMembersScores(
    sortedSetKey: string,
    members: string[],
  ): Promise<NullableNumber[]> {
    const rawScores: (string | null)[] = await this.redisClient.zmscore(
      sortedSetKey,
      members,
    );

    return rawScores.map((rawScore) =>
      hasValue(rawScore) ? parseInt(rawScore) : null,
    );
  }

  async getMembersRevRanks(
    sortedSetKey: string,
    members: string[],
  ): Promise<NullableNumber[]> {
    return Promise.all(
      members.map((member) => this.redisClient.zrevrank(sortedSetKey, member)),
    );
  }

  async getMembersRanks(
    sortedSetKey: string,
    members: string[],
  ): Promise<NullableNumber[]> {
    return Promise.all(
      members.map((member) => this.redisClient.zrank(sortedSetKey, member)),
    );
  }

  async getSize(sortedSetKey: string): Promise<number> {
    return this.redisClient.zcard(sortedSetKey);
  }

  private membersAndScoresToSortedData(
    membersAndScores: string[],
    startingRank: number,
  ): SortedSetData[] {
    return chunk(membersAndScores, 2).map(([member, scoreAsString], idx) => ({
      member,
      score: parseInt(scoreAsString),
      rank: startingRank + idx,
    }));
  }

  private zipMembersScoresRanksToSortedData(
    members: string[],
    scores: NullableNumber[],
    ranks: NullableNumber[],
  ): SortedSetData[] {
    return zip(members, scores, ranks).map(([member, score, rank]) => ({
      member,
      score,
      rank,
    }));
  }
}
