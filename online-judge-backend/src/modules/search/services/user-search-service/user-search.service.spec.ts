import { UserSearchService } from './user-search.service';
import { Redis } from 'ioredis';
import { UserSearchEntityIdentityIdentifierMapper } from './user-search-entity-identifier-mapper';
import { UserSearchEntityScoreCalculator } from './user-search-entity-score-calculator';
import { OffsetPaginationService } from 'src/modules/pagination/offset-pagination.service';
import { UserSearchScoreCalculationQueue } from '../../queues/user-search-score-calculation.queue';
import { UsersService } from 'src/modules/users/users.service';
import { EntitySorterService } from 'src/lib/entity-sorter/entity-sorter.service';
import { createUser } from 'src/lib/tests/createUser';
import { SortedSetOrder } from 'src/modules/cache/sorted-set/sorted-set-paginated-query-builder';

describe(UserSearchService.name, () => {
  const redisClient = Redis.prototype;
  const userSearchEntityIdentifierMapper =
    UserSearchEntityIdentityIdentifierMapper.prototype;
  const userSearchEntityScoreCalculator =
    UserSearchEntityScoreCalculator.prototype;
  const offsetPaginationService = OffsetPaginationService.prototype;
  const userSearchScoreCalculationQueue =
    UserSearchScoreCalculationQueue.prototype;
  const usersService = UsersService.prototype;
  const entitySorterService = EntitySorterService.prototype;
  let service: UserSearchService;

  beforeEach(() => {
    jest
      .spyOn(userSearchScoreCalculationQueue, 'setConsumer')
      .mockImplementation();

    service = new UserSearchService(
      redisClient,
      userSearchEntityIdentifierMapper,
      userSearchEntityScoreCalculator,
      offsetPaginationService,
      userSearchScoreCalculationQueue,
      usersService,
    );
  });

  describe('constructor', () => {
    it('subscribes to UserSearchScoreCalculationQueue', () => {
      expect(userSearchScoreCalculationQueue.setConsumer).toHaveBeenCalled();
    });
  });

  describe('getSuggestions', () => {
    it('calls necessary functions & returns correctly', async () => {
      jest
        .spyOn(entitySorterService, 'getPaginatedSortedEntites')
        .mockResolvedValue({
          data: [
            {
              entity: createUser(1),
              rank: 0,
              numericScore: 1,
              schematicScore: { priority: 1 },
            },
          ],
          meta: { total: 1, offset: 0, limit: 10 },
        });

      const result = await service.getSuggestions('UsEr');

      expect(entitySorterService.getPaginatedSortedEntites).toBeCalledWith(
        'UserSearchSuggestions:user',
        { offset: 0, limit: 10, order: SortedSetOrder.SCORE_DESC },
      );
      expect(result).toEqual([createUser(1)]);
    });
  });

  describe('upsertSuggestion', () => {
    const user = createUser(1, 'AbC');

    it('calls necessary functions', async () => {
      jest.spyOn(usersService, 'findById').mockResolvedValue(user);
      jest.spyOn(entitySorterService, 'updateEntityScore').mockImplementation();

      await service.upsertSuggestion(user.id);

      for (const text of ['a', 'ab', 'abc']) {
        expect(entitySorterService.updateEntityScore).toHaveBeenCalledWith(
          `UserSearchSuggestions:${text}`,
          user,
        );
      }
    });
  });
});
