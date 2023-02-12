import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { map, range } from 'lodash';
import { SortedSetOrder } from 'src/modules/cache/sorted-set/sorted-set-paginated-query-builder';
import { SortedSetService } from 'src/modules/cache/sorted-set/sorted-set.service';
import { JobQueueItem } from 'src/modules/job/interfaces';
import { OffsetPaginationService } from 'src/modules/pagination/offset-pagination.service';
import { EntitySorterService } from 'src/modules/scoreboard/helpers/entity-sorter/entity-sorter.service';
import { User } from 'src/modules/users/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { UserSearchScoringSchema } from '../../interfaces/user-search';
import {
  UserSearchScoreCalculationQueue,
  UserSearchScoreCalculationQueueItem,
} from '../../queues/user-search-score-calculation.queue';
import { UserSearchEntityIdentityIdentifierMapper } from './user-search-entity-identifier-mapper';
import { UserSearchEntityScoreCalculator } from './user-search-entity-score-calculator';

@Injectable()
export class UserSearchService {
  private SORTED_SET_KEY_PREFIX = 'UserSearchSuggestions:';
  private NUMBER_OF_SUGGESTIONS = 10;

  private entitySorterService: EntitySorterService<
    User,
    UserSearchScoringSchema
  >;

  constructor(
    @InjectRedis() redisClient: Redis,
    userSearchEntityIdentifierMapper: UserSearchEntityIdentityIdentifierMapper,
    userSearchEntityScoreCalculator: UserSearchEntityScoreCalculator,
    offsetPaginationService: OffsetPaginationService,
    userSearchScoreCalculationQueue: UserSearchScoreCalculationQueue,
    private readonly usersService: UsersService,
  ) {
    userSearchScoreCalculationQueue.setConsumer((item) =>
      this.consumeScoreCalculationItem(item),
    );

    this.entitySorterService = new EntitySorterService(
      new SortedSetService(redisClient),
      userSearchEntityIdentifierMapper,
      userSearchEntityScoreCalculator,
      offsetPaginationService,
    );
  }

  async getSuggestions(usernamePrefix: string): Promise<User[]> {
    const result = await this.entitySorterService.getPaginatedSortedEntites(
      this.getSortedSetKey(usernamePrefix.toLowerCase()),
      {
        offset: 0,
        limit: this.NUMBER_OF_SUGGESTIONS,
        order: SortedSetOrder.SCORE_DESC,
      },
    );

    return map(result.data, 'entity');
  }

  async upsertSuggestion(userId: number) {
    const user = await this.usersService.findById(userId);
    const lowercasedUsername = user.username.toLowerCase();

    await Promise.all(
      range(1, lowercasedUsername.length + 1).map((prefixLength) => {
        const usernamePrefix = lowercasedUsername.substring(0, prefixLength);
        this.entitySorterService.updateEntityScore(
          this.getSortedSetKey(usernamePrefix),
          user,
        );
      }),
    );
  }

  private async consumeScoreCalculationItem(
    queueItem: JobQueueItem<UserSearchScoreCalculationQueueItem>,
  ) {
    const userId = queueItem.item.userId;
    await this.upsertSuggestion(userId);
  }

  private getSortedSetKey(usernamePrefix: string): string {
    return `${this.SORTED_SET_KEY_PREFIX}${usernamePrefix}`;
  }
}
