import { Injectable } from '@nestjs/common';
import { map } from 'lodash';
import { OffsetPaginationResult } from 'src/modules/pagination/offset-pagination.interface';
import { ProblemsService } from 'src/modules/problems/services/problems.service';
import { UserProblemAttemptsService } from 'src/modules/problems/services/user-problem-attempts.service';
import { User } from 'src/modules/users/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { ScoreboardGetDto } from '../data-transfer-objects/scoreboard-get.dto';
import { SortedEntitiesPaginationParameter } from '../../../lib/entity-sorter/interfaces';
import { ScoreboardRow } from '../interfaces/scoreboard';
import { ScoreboardEntitySorterService } from './scoreboard-entity-sorter.service';

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 25;

@Injectable()
export class ScoreboardReaderService {
  constructor(
    private readonly scoreboardEntitySorterService: ScoreboardEntitySorterService,
    private readonly usersService: UsersService,
    private readonly userProblemAttemptsService: UserProblemAttemptsService,
    private readonly problemsService: ProblemsService,
  ) {}

  async getScoreboard(
    parameters: ScoreboardGetDto,
  ): Promise<OffsetPaginationResult<ScoreboardRow>> {
    const paginatedScoreboardParameters: Omit<
      SortedEntitiesPaginationParameter<User>,
      'order'
    > = {
      offset: parameters.offset || DEFAULT_OFFSET,
      limit: parameters.limit || DEFAULT_LIMIT,
    };

    if (parameters.userIds?.length > 0) {
      const users = await this.usersService.getUsersByIds(parameters.userIds);
      paginatedScoreboardParameters.entities = users;
    }

    const { data: rawResults, meta } =
      await this.scoreboardEntitySorterService.getPaginatedScoreboardRows(
        paginatedScoreboardParameters,
      );

    const usersProblemAttemptsMap =
      await this.userProblemAttemptsService.getAllUsersAttemptsOnPublishedProblems(
        map(rawResults, 'entity.id'),
      );

    const results: ScoreboardRow[] = rawResults.map((rawResult) => ({
      user: rawResult.entity,
      rank: rawResult.rank,
      numericScore: rawResult.numericScore,
      schematicScore: rawResult.schematicScore,
      userProblemAttempts:
        usersProblemAttemptsMap.get(rawResult.entity.id) || [],
    }));

    return {
      data: results,
      meta,
    };
  }

  async getScoreboardProblems() {
    return this.problemsService.getAllPublishedProblemsOrderedById();
  }
}
