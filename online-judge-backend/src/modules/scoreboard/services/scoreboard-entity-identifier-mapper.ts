import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/users/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { EntityIdentifierMapper } from '../../../lib/entity-sorter/interfaces';

@Injectable()
export class ScoreboardEntityIdentifierMapper
  implements EntityIdentifierMapper<User>
{
  constructor(private readonly usersService: UsersService) {}

  async toIdentifiers(users: User[]): Promise<string[]> {
    return users.map((user) => `user:${user.id}`);
  }

  async fromIdentifiers(identifiers: string[]): Promise<User[]> {
    const userIds = identifiers.map((identifier) => {
      const [, userIdAsString] = identifier.split(':');
      return parseInt(userIdAsString);
    });

    return this.usersService.getUsersByIds(userIds);
  }
}
