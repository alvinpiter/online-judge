import { User } from 'src/modules/users/user.entity';
import { EntityIdentifierMapper } from '../interfaces';

// Implementation is not important because it will be mocked anyway
export class MockedEntitiyIdentifierMapper
  implements EntityIdentifierMapper<User>
{
  async toIdentifiers(users: User[]): Promise<string[]> {
    return [];
  }

  async fromIdentifiers(identifiers: string[]): Promise<User[]> {
    return [];
  }
}
