import { GlobalScoreboardSortedSetMemberMapper } from './global-scoreboard-sorted-set-member-mapper';
import { UsersService } from 'src/modules/users/users.service';
import { createUser } from 'src/lib/tests/createUser';

describe(GlobalScoreboardSortedSetMemberMapper.name, () => {
  const usersService = UsersService.prototype;
  let service: GlobalScoreboardSortedSetMemberMapper;

  beforeEach(() => {
    service = new GlobalScoreboardSortedSetMemberMapper(usersService);
  });

  describe('toSortedSetMember', () => {
    it.each([
      [createUser(77), 'user:77'],
      [createUser(88), 'user:88'],
      [createUser(99), 'user:99'],
    ])(
      `Member string for user %s should be %s`,
      (user, expectedMemberString) => {
        expect(service.toSortedSetMember(user)).toEqual(expectedMemberString);
      },
    );
  });

  describe('fromSortedSetMembers', () => {
    const members = ['user:77', 'user:88', 'user:99'];
    const expectedUsers = [createUser(77), createUser(88), createUser(99)];

    it('returns the correct users', async () => {
      jest
        .spyOn(usersService, 'getUsersByIds')
        .mockResolvedValue(expectedUsers);

      const result = await service.fromSortedSetMembers(members);

      expect(usersService.getUsersByIds).toHaveBeenCalledWith([77, 88, 99]);
      expect(usersService.getUsersByIds).toHaveBeenCalledTimes(1);

      expect(result).toEqual(expectedUsers);
    });
  });
});
