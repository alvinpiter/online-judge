import { Injectable } from '@nestjs/common';
import { ProblemsService } from '../problems/services/problems.service';
import { UserProblemAttemptsService } from '../problems/services/user-problem-attempts.service';
import { UsersService } from '../users/users.service';
import { Scoreboard } from './interfaces/scoreboard-row';

@Injectable()
export class ScoreboardService {
  constructor(
    private readonly usersService: UsersService,
    private readonly problemsService: ProblemsService,
    private readonly userProblemAttemptsService: UserProblemAttemptsService,
  ) {}

  async getScoreboard(): Promise<Scoreboard> {
    // Temporary implementation
    const users = await this.usersService.getUsersByIds([1, 2]);

    const problems =
      await this.problemsService.getAllPublishedProblemsOrderedById();
    const problemIds = problems.map((problem) => problem.id);

    const scoreboardRows = await Promise.all(
      users.map(async (user) => {
        const userProblemAttempts =
          await this.userProblemAttemptsService.getUserProblemAttempts(
            user.id,
            problemIds,
          );
        return {
          user,
          userProblemAttempts,
        };
      }),
    );

    return {
      problems,
      data: scoreboardRows,
      meta: {
        offset: 0,
        limit: 10,
        total: 100,
      },
    };
  }
}
