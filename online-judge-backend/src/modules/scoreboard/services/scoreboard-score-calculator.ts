import { Injectable } from '@nestjs/common';
import { leftShift, rightShift } from 'src/lib/math';
import { UserProblemAttemptsService } from 'src/modules/problems/services/user-problem-attempts.service';
import { User } from 'src/modules/users/user.entity';
import { EntityScoreCalculator } from '../../../lib/entity-sorter/interfaces';
import { ScoreboardScoringSchema } from '../interfaces/scoreboard';

const NUMBER_OF_SHIFTS = 42;

@Injectable()
export class ScoreboardScoreCalculator
  implements EntityScoreCalculator<User, ScoreboardScoringSchema>
{
  constructor(
    private readonly userProblemAttemptsService: UserProblemAttemptsService,
  ) {}

  async getNumericScore(user: User): Promise<number> {
    const userProblemAttempts =
      await this.userProblemAttemptsService.getAllUserAttemptsOnPublishedProblems(
        user.id,
      );

    let solveCount = 0;
    let lastSolveTimeInMilliseconds = 0;
    for (const userProblemAttempt of userProblemAttempts) {
      if (userProblemAttempt.alreadySolved()) {
        solveCount += 1;
        lastSolveTimeInMilliseconds = Math.max(
          lastSolveTimeInMilliseconds,
          userProblemAttempt.firstSolvedAt.getTime(),
        );
      }
    }

    /*
    At the time this app is build, lastSolveTimeInMilliseconds's value is around 1.6 trillion (< 2^42).
    We will encode the score as the following:
    (solveCount << 37) + ((1 << 37) - 1) - lastSolveTimeInMilliseconds

    This way, we can ensure that:
    * If the solveCount are different, the larger one will have larger score
    * If the solveCount are the same, the one with smaller lastSolveTimeInMilliseconds will have larger score
     */

    return (
      leftShift(solveCount, NUMBER_OF_SHIFTS) +
      (leftShift(1, NUMBER_OF_SHIFTS) - 1) -
      lastSolveTimeInMilliseconds
    );
  }

  async getSchematicScore(
    numericScore: number,
  ): Promise<ScoreboardScoringSchema> {
    const solveCount = rightShift(numericScore, NUMBER_OF_SHIFTS);
    const lastSolveTimeInMilliseconds =
      leftShift(solveCount, NUMBER_OF_SHIFTS) +
      (leftShift(1, NUMBER_OF_SHIFTS) - 1) -
      numericScore;

    return {
      solveCount,
      lastSolveTimeInMilliseconds,
    };
  }
}
