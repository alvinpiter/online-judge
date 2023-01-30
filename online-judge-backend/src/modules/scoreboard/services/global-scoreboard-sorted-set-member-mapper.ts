import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/users/user.entity';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class GlobalScoreboardSortedSetMemberMapper {
  constructor(private readonly usersService: UsersService) {}

  toSortedSetMember(user: User) {
    return `user:${user.id}`;
  }

  async fromSortedSetMembers(members: string[]): Promise<User[]> {
    const userIds = members.map((member) => {
      const [, userIdAsString] = member.split(':');
      return parseInt(userIdAsString);
    });

    return this.usersService.getUsersByIds(userIds);
  }
}
