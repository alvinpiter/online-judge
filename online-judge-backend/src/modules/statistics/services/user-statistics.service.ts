import { Injectable } from '@nestjs/common';
import { hasValue } from 'src/lib/hasValue';
import { UserProblemAttemptsService } from 'src/modules/problems/services/user-problem-attempts.service';
import { ScoreboardReaderService } from 'src/modules/scoreboard/services/scoreboard-reader.service';
import { UserStatistics } from '../interfaces/user-statistics';

@Injectable()
export class UserStatisticsService {
  constructor(
    private readonly userProblemAttemptsService: UserProblemAttemptsService,
    private readonly scoreboardReaderService: ScoreboardReaderService,
  ) {}

  async getUserStatistics(userId: number): Promise<UserStatistics> {
    const allProblemAttempts =
      await this.userProblemAttemptsService.getAllUserProblemAttempts(userId, [
        'problem',
      ]);

    const solvedProblems = allProblemAttempts
      .filter((attempt) => attempt.alreadySolved())
      .map((attempt) => attempt.problem);

    const attemptedProblems = allProblemAttempts
      .filter((attempt) => !attempt.alreadySolved())
      .map((attempt) => attempt.problem);

    const filteredScoreboard = await this.scoreboardReaderService.getScoreboard(
      { userIds: [userId] },
    );
    const scoreboardRow =
      filteredScoreboard.data.length > 0 ? filteredScoreboard.data[0] : null;

    return {
      rank: hasValue(scoreboardRow) ? scoreboardRow.rank : null,
      solvedProblems,
      attemptedProblems,
    };
  }
}
