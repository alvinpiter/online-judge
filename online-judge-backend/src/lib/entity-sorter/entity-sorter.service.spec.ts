import { pick } from 'lodash';
import { createUser } from 'src/lib/tests/createUser';
import {
  SortedSetOrder,
  SortedSetPaginatedQueryBuilder,
} from 'src/modules/cache/sorted-set/sorted-set-paginated-query-builder';
import { SortedSetService } from 'src/modules/cache/sorted-set/sorted-set.service';
import { OffsetPaginationService } from 'src/modules/pagination/offset-pagination.service';
import { User } from 'src/modules/users/user.entity';
import { EntitySorterService } from './entity-sorter.service';
import { UserScoringSchema } from './test-mocks/interfaces';
import { MockedEntitiyIdentifierMapper } from './test-mocks/mocked-entity-identifier-mapper';
import { MockedEntityScoreCalculator } from './test-mocks/mocked-entity-score-calculator';

describe(EntitySorterService.name, () => {
  const sortedSetKey = 'sortedSetKey';
  const sortedSetService = SortedSetService.prototype;
  const entityIdentifierMapper = new MockedEntitiyIdentifierMapper();
  const entityScoreCalculator = new MockedEntityScoreCalculator();
  const offsetPaginationService = OffsetPaginationService.prototype;
  let service: EntitySorterService<User, UserScoringSchema>;

  beforeEach(() => {
    service = new EntitySorterService<User, UserScoringSchema>(
      sortedSetService,
      entityIdentifierMapper,
      entityScoreCalculator,
      offsetPaginationService,
    );
  });

  describe('getPaginatedSortedEntities', () => {
    const user1 = {
      entity: createUser(1),
      member: 'user:1',
      score: 1,
      numericScore: 1,
      schematicScore: { numberOfFriends: 1, numberOfEnemies: 1 },
      rank: 1,
    };

    const user2 = {
      entity: createUser(2),
      member: 'user:2',
      score: 2,
      numericScore: 2,
      schematicScore: { numberOfFriends: 2, numberOfEnemies: 2 },
      rank: 2,
    };

    const fieldsFromPaginationService = ['member', 'score', 'rank'];
    const fieldsInFinalResult = [
      'entity',
      'numericScore',
      'schematicScore',
      'rank',
    ];

    const offsetLimit = {
      offset: 1,
      limit: 2,
    };
    const offsetLimitWithOrder = {
      ...offsetLimit,
      order: SortedSetOrder.SCORE_DESC,
    };
    const paginationMeta = { ...offsetLimit, total: 10 };

    it('returns the correct result', async () => {
      jest.spyOn(offsetPaginationService, 'paginate').mockResolvedValue({
        data: [
          pick(user1, ...fieldsFromPaginationService),
          pick(user2, ...fieldsFromPaginationService),
        ],
        meta: paginationMeta,
      });

      jest
        .spyOn(entityIdentifierMapper, 'fromIdentifiers')
        .mockResolvedValue([user1.entity, user2.entity]);

      jest
        .spyOn(entityScoreCalculator, 'getSchematicScore')
        .mockImplementation(async (numericScore) => {
          if (numericScore === 1) {
            return user1.schematicScore;
          } else {
            return user2.schematicScore;
          }
        });

      const result = await service.getPaginatedSortedEntites(
        sortedSetKey,
        offsetLimitWithOrder,
      );

      expect(offsetPaginationService.paginate).toHaveBeenCalledWith(
        expect.any(SortedSetPaginatedQueryBuilder),
        offsetLimit,
      );
      expect(entityIdentifierMapper.fromIdentifiers).toHaveBeenCalledWith([
        'user:1',
        'user:2',
      ]);
      expect(entityScoreCalculator.getSchematicScore).toHaveBeenCalledWith(1);
      expect(entityScoreCalculator.getSchematicScore).toHaveBeenCalledWith(2);
      expect(result).toEqual({
        data: [
          pick(user1, ...fieldsInFinalResult),
          pick(user2, ...fieldsInFinalResult),
        ],
        meta: paginationMeta,
      });
    });
  });

  describe('updateEntityScore', () => {
    it('calls sortedSetService with the correct parameters', async () => {
      const entity = createUser(1);

      jest
        .spyOn(entityIdentifierMapper, 'toIdentifiers')
        .mockResolvedValue(['user:1']);

      jest
        .spyOn(entityScoreCalculator, 'getNumericScore')
        .mockResolvedValue(10);

      jest.spyOn(sortedSetService, 'upsertMemberScore').mockImplementation();

      await service.updateEntityScore(sortedSetKey, entity);

      expect(entityIdentifierMapper.toIdentifiers).toHaveBeenCalledTimes(1);
      expect(entityIdentifierMapper.toIdentifiers).toHaveBeenCalledWith([
        entity,
      ]);

      expect(entityScoreCalculator.getNumericScore).toHaveBeenCalledTimes(1);
      expect(entityScoreCalculator.getNumericScore).toHaveBeenCalledWith(
        entity,
      );

      expect(sortedSetService.upsertMemberScore).toHaveBeenCalledTimes(1);
      expect(sortedSetService.upsertMemberScore).toHaveBeenCalledWith(
        sortedSetKey,
        'user:1',
        10,
      );
    });
  });
});
