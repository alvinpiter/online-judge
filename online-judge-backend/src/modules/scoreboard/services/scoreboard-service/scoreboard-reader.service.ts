import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { SortedSetPaginatedQueryBuilder } from 'src/modules/cache/sorted-set/sorted-set-paginated-query-builder';
import { OffsetPaginationService } from 'src/modules/pagination/offset-pagination.service';
import { ProblemsService } from 'src/modules/problems/services/problems.service';
import { UserProblemAttemptsService } from 'src/modules/problems/services/user-problem-attempts.service';
import { User } from 'src/modules/users/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { ScoreboardGetDto } from '../../data-transfer-objects/scoreboard-get.dto';
import { ScoreboardRow } from '../../interfaces/scoreboard-row';
import { ScoreboardScoreCalculatorService } from '../scoreboard-score-calculator/scoreboard-score-calculator.service';
import { BySolveCountAndLastSolveTimeScoringSchema } from '../scoreboard-score-calculator/strategies/by-solve-count-and-last-solve-time.strategy';
import { BaseScoreboardService } from './base-scoreboard.service';

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 25;

@Injectable()
export class ScoreboardReaderService extends BaseScoreboardService {
  constructor(
    @InjectRedis() redisClient: Redis,
    usersService: UsersService,
    private readonly userProblemAttemptsService: UserProblemAttemptsService,
    private readonly scoreboardScoreCalculatorService: ScoreboardScoreCalculatorService,
    private readonly problemsService: ProblemsService,
    private readonly offsetPaginationService: OffsetPaginationService,
  ) {
    super(redisClient, usersService);
  }

  async getScoreboard(scoreboardGetDto: ScoreboardGetDto) {
    const qb = new SortedSetPaginatedQueryBuilder(this.sortedSetService);

    if (scoreboardGetDto.userId) {
      qb.addMemberFilter(
        this.scoreboardSortedSetMemberMapper.toSortedSetMember(
          scoreboardGetDto.userId,
        ),
      );
    }

    const { data: rawScoreboardRows, meta } =
      await this.offsetPaginationService.paginate(qb, {
        offset: scoreboardGetDto.offset || DEFAULT_OFFSET,
        limit: scoreboardGetDto.limit || DEFAULT_LIMIT,
      });

    const sortedSetMembers = rawScoreboardRows.map((row) => row.member);

    const users =
      await this.scoreboardSortedSetMemberMapper.fromSortedSetMembers(
        sortedSetMembers,
      );
    const sortedSetMemberToUserMap = new Map<string, User>();
    for (let idx = 0; idx < sortedSetMembers.length; idx++) {
      sortedSetMemberToUserMap.set(sortedSetMembers[idx], users[idx]);
    }

    const userProblemAttemptsMap =
      await this.userProblemAttemptsService.getAllUsersProblemAttempts(
        users.map((user) => user.id),
      );

    const scoreboardRows: ScoreboardRow[] = await Promise.all(
      rawScoreboardRows.map(async (rawScoreboardRow, idx) => ({
        user: sortedSetMemberToUserMap.get(rawScoreboardRow.member),
        rank: rawScoreboardRow.rank,
        score: (await this.scoreboardScoreCalculatorService.decodeScore(
          rawScoreboardRow.score,
          this.SCORE_CALCULATION_STRATEGY,
        )) as BySolveCountAndLastSolveTimeScoringSchema,
        userProblemAttempts: userProblemAttemptsMap.get(users[idx].id),
      })),
    );

    return {
      data: scoreboardRows,
      meta,
    };
  }

  async getScoreboardProblems() {
    return this.problemsService.getAllPublishedProblemsOrderedById();
  }
}
