import { Injectable } from '@nestjs/common';
import { EntityScoreCalculator } from 'src/modules/scoreboard/helpers/entity-sorter/interfaces';
import { User } from 'src/modules/users/user.entity';
import { UserSearchScoringSchema } from '../../interfaces/user-search';

@Injectable()
export class UserSearchEntityScoreCalculator
  implements EntityScoreCalculator<User, UserSearchScoringSchema>
{
  async getNumericScore(): Promise<number> {
    return 1;
  }

  async getSchematicScore(): Promise<UserSearchScoringSchema> {
    return {
      priority: 1,
    };
  }
}
