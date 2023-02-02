import { UsersService } from 'src/modules/users/users.service';
import { createUser } from 'src/lib/tests/createUser';
import { GlobalScoreboardEntityIdentifierMapper } from './global-scoreboard-entity-identifier-mapper';

describe(GlobalScoreboardEntityIdentifierMapper.name, () => {
  const usersService = UsersService.prototype;
  let service: GlobalScoreboardEntityIdentifierMapper;

  beforeEach(() => {
    service = new GlobalScoreboardEntityIdentifierMapper(usersService);
  });

  describe('toIdentifer', () => {
    it.each([
      [createUser(77), 'user:77'],
      [createUser(88), 'user:88'],
      [createUser(99), 'user:99'],
    ])(
      `Member string for user %s should be %s`,
      async (user, expectedMemberString) => {
        expect(await service.toIdentifier(user)).toEqual(expectedMemberString);
      },
    );
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
