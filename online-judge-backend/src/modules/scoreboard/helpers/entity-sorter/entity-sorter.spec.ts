import { createUser } from 'src/lib/tests/createUser';
import { SortedSetService } from 'src/modules/cache/sorted-set/sorted-set.service';
import { User } from 'src/modules/users/user.entity';
import { EntitySorterService } from './entity-sorter';
import { UserScoringSchema } from './test-mocks/interfaces';
import { MockedEntitiyIdentifierMapper } from './test-mocks/mocked-entity-identifier-mapper';
import { MockedEntityScoreCalculator } from './test-mocks/mocked-entity-score-calculator';

describe(EntitySorterService.name, () => {
  const sortedSetService = SortedSetService.prototype;
  const entityIdentifierMapper = new MockedEntitiyIdentifierMapper();
  const entityScoreCalculator = new MockedEntityScoreCalculator();
  let service: EntitySorterService<User, UserScoringSchema>;

  beforeEach(() => {
    service = new EntitySorterService<User, UserScoringSchema>(
      sortedSetService,
      entityIdentifierMapper,
      entityScoreCalculator,
    );
  });

  describe('updateEntityScore', () => {
    it('calls sortedSetService with the correct parameters', async () => {
      const entity = createUser(1);

      jest
        .spyOn(entityIdentifierMapper, 'toIdentifier')
        .mockResolvedValue('user:1');

      jest
        .spyOn(entityScoreCalculator, 'getNumericScore')
        .mockResolvedValue(10);

      jest.spyOn(sortedSetService, 'upsertMemberScore').mockImplementation();

      await service.updateEntityScore(entity);

      expect(entityIdentifierMapper.toIdentifier).toHaveBeenCalledTimes(1);
      expect(entityIdentifierMapper.toIdentifier).toHaveBeenCalledWith(entity);

      expect(entityScoreCalculator.getNumericScore).toHaveBeenCalledTimes(1);
      expect(entityScoreCalculator.getNumericScore).toHaveBeenCalledWith(
        entity,
      );

      expect(sortedSetService.upsertMemberScore).toHaveBeenCalledTimes(1);
      expect(sortedSetService.upsertMemberScore).toHaveBeenCalledWith(
        'user:1',
        10,
      );
    });
  });
});
