import { User } from 'src/modules/users/user.entity';
import { UsersService } from 'src/modules/users/users.service';

export class GlobalScoreboardSortedSetMemberMapper {
  constructor(private readonly usersService: UsersService) {}

  toSortedSetMember(userId: number) {
    return `user:${userId}`;
  }

  async fromSortedSetMembers(members: string[]): Promise<User[]> {
    const userIds = members.map((member) => {
      const [, userIdAsString] = member.split(':');
      return parseInt(userIdAsString);
    });

    return this.usersService.getUsersByIds(userIds);
  }
}
