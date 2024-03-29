import { UsersService } from 'src/modules/users/users.service';
import { createUser } from 'src/lib/tests/createUser';
import { ScoreboardEntityIdentifierMapper } from './scoreboard-entity-identifier-mapper';

describe(ScoreboardEntityIdentifierMapper.name, () => {
  const usersService = UsersService.prototype;
  let service: ScoreboardEntityIdentifierMapper;

  beforeEach(() => {
    service = new ScoreboardEntityIdentifierMapper(usersService);
  });

  describe('toIdentifers', () => {
    it('returns the correct identifiers', async () => {
      const users = [createUser(77), createUser(88), createUser(99)];
      const result = await service.toIdentifiers(users);
      expect(result).toEqual(['user:77', 'user:88', 'user:99']);
    });
  });

  describe('fromIdentifiers', () => {
    const identifiers = ['user:77', 'user:88', 'user:99'];
    const expectedUsers = [createUser(77), createUser(88), createUser(99)];

    it('returns the correct users', async () => {
      jest
        .spyOn(usersService, 'getUsersByIds')
        .mockResolvedValue(expectedUsers);

      const result = await service.fromIdentifiers(identifiers);

      expect(usersService.getUsersByIds).toHaveBeenCalledWith([77, 88, 99]);
      expect(usersService.getUsersByIds).toHaveBeenCalledTimes(1);

      expect(result).toEqual(expectedUsers);
    });
  });
});
