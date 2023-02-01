import { User } from 'src/modules/users/user.entity';
import { EntityScoreCalculator } from '../interfaces';
import { UserScoringSchema } from './interfaces';

// Implementation is not important because it will be mocked anyway
export class MockedEntityScoreCalculator
  implements EntityScoreCalculator<User, UserScoringSchema>
{
  async getNumericScore(entity: User): Promise<number> {
    return 0;
  }

  async getSchematicScore(
    numericScore: number | null,
  ): Promise<UserScoringSchema> {
    return {
      numberOfFriends: 0,
      numberOfEnemies: 0,
    };
  }
}
