import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { map } from 'lodash';
import { SortedSetOrder } from 'src/modules/cache/sorted-set/sorted-set-paginated-query-builder';
import { SortedSetService } from 'src/modules/cache/sorted-set/sorted-set.service';
import { JobQueueItem } from 'src/modules/job/interfaces';
import { OffsetPaginationResult } from 'src/modules/pagination/offset-pagination.interface';
import { OffsetPaginationService } from 'src/modules/pagination/offset-pagination.service';
import { ProblemsService } from 'src/modules/problems/services/problems.service';
import { UserProblemAttemptsService } from 'src/modules/problems/services/user-problem-attempts.service';
import { User } from 'src/modules/users/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { ScoreboardGetDto } from '../data-transfer-objects/scoreboard-get.dto';
import { EntitySorterService } from '../helpers/entity-sorter/entity-sorter.service';
import { SortedEntitiesPaginationParameter } from '../helpers/entity-sorter/interfaces';
import {
  ScoreboardRow,
  ScoreboardScoringSchema,
} from '../interfaces/scoreboard';
import {
  ScoreboardScoreCalculationQueue,
  ScoreboardScoreCalculationQueueItem,
} from '../queues/scoreboard-score-calculation.queue';
import { ScoreboardEntityIdentifierMapper } from './scoreboard-entity-identifier-mapper';
import { ScoreboardScoreCalculator } from './scoreboard-score-calculator';

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 25;

@Injectable()
export class ScoreboardService {
  private SORTED_SET_KEY = 'Scoreboard';
  private SORTED_SET_ORDER = SortedSetOrder.SCORE_DESC;

  private sortedSetService: SortedSetService;
  private entitySorterService: EntitySorterService<
    User,
    ScoreboardScoringSchema
  >;

  constructor(
    scoreboardScoreCalculationQueue: ScoreboardScoreCalculationQueue,
    @InjectRedis() redisClient: Redis,
    private readonly scoreboardEntityIdentifierMapper: ScoreboardEntityIdentifierMapper,
    private readonly scoreboardScoreCalculator: ScoreboardScoreCalculator,
    private readonly offsetPaginationService: OffsetPaginationService,
    private readonly usersService: UsersService,
    private readonly userProblemAttemptsService: UserProblemAttemptsService,
    private readonly problemsService: ProblemsService,
  ) {
    this.sortedSetService = new SortedSetService(
      redisClient,
      this.SORTED_SET_KEY,
    );

    this.entitySorterService = new EntitySorterService(
      this.SORTED_SET_ORDER,
      this.sortedSetService,
      this.scoreboardEntityIdentifierMapper,
      this.scoreboardScoreCalculator,
      this.offsetPaginationService,
    );

    scoreboardScoreCalculationQueue.setConsumer((item) =>
      this.processScoreboardScoreCalculation(item),
    );
  }

  async processScoreboardScoreCalculation(
    queueItem: JobQueueItem<ScoreboardScoreCalculationQueueItem>,
  ) {
    const userId = queueItem.item.userId;
    const user = await this.usersService.findById(userId);

    this.entitySorterService.updateEntityScore(user);
  }

  async getScoreboard(
    parameters: ScoreboardGetDto,
  ): Promise<OffsetPaginationResult<ScoreboardRow>> {
    const sortedEntitiesPaginationParameter: SortedEntitiesPaginationParameter<User> =
      {
        offset: parameters.offset || DEFAULT_OFFSET,
        limit: parameters.limit || DEFAULT_LIMIT,
      };

    if (parameters.userId) {
      const user = await this.usersService.findById(parameters.userId);
      sortedEntitiesPaginationParameter.entity = user;
    }

    const { data: rawResults, meta } =
      await this.entitySorterService.getPaginatedSortedEntites(
        sortedEntitiesPaginationParameter,
      );

    const usersProblemAttemptsMap =
      await this.userProblemAttemptsService.getAllUsersProblemAttempts(
        map(rawResults, 'entity.id'),
      );

    const results: ScoreboardRow[] = rawResults.map((rawResult) => ({
      user: rawResult.entity,
      rank: rawResult.rank,
      score: rawResult.schematicScore,
      userProblemAttempts:
        usersProblemAttemptsMap.get(rawResult.entity.id) || [],
    }));

    return {
      data: results,
      meta,
    };
  }

  async getScoreboardProblems() {
    return this.problemsService.getAllPublishedProblemsOrderedById();
  }
}
