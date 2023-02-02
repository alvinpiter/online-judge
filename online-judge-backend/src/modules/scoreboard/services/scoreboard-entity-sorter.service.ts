import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { SortedSetOrder } from 'src/modules/cache/sorted-set/sorted-set-paginated-query-builder';
import { SortedSetService } from 'src/modules/cache/sorted-set/sorted-set.service';
import { OffsetPaginationResult } from 'src/modules/pagination/offset-pagination.interface';
import { OffsetPaginationService } from 'src/modules/pagination/offset-pagination.service';
import { User } from 'src/modules/users/user.entity';
import { EntitySorterService } from '../helpers/entity-sorter/entity-sorter.service';
import {
  SortedEntitiesPaginationParameter,
  SortedEntity,
} from '../helpers/entity-sorter/interfaces';
import { ScoreboardScoringSchema } from '../interfaces/scoreboard';
import { ScoreboardEntityIdentifierMapper } from './scoreboard-entity-identifier-mapper';
import { ScoreboardScoreCalculator } from './scoreboard-score-calculator';

@Injectable()
export class ScoreboardEntitySorterService {
  private SORTED_SET_KEY = 'Scoreboard';
  private SORTED_SET_ORDER = SortedSetOrder.SCORE_DESC;

  private entitySorterService: EntitySorterService<
    User,
    ScoreboardScoringSchema
  >;

  constructor(
    @InjectRedis() redisClient: Redis,
    private readonly scoreboardEntityIdentifierMapper: ScoreboardEntityIdentifierMapper,
    private readonly scoreboardScoreCalculator: ScoreboardScoreCalculator,
    private readonly offsetPaginationService: OffsetPaginationService,
  ) {
    this.entitySorterService = new EntitySorterService(
      this.SORTED_SET_ORDER,
      new SortedSetService(redisClient, this.SORTED_SET_KEY),
      this.scoreboardEntityIdentifierMapper,
      this.scoreboardScoreCalculator,
      this.offsetPaginationService,
    );
  }

  async getPaginatedScoreboardRows(
    parameters: SortedEntitiesPaginationParameter<User>,
  ): Promise<
    OffsetPaginationResult<SortedEntity<User, ScoreboardScoringSchema>>
  > {
    return this.entitySorterService.getPaginatedSortedEntites(parameters);
  }

  async updateUserScore(user: User) {
    await this.entitySorterService.updateEntityScore(user);
  }
}
