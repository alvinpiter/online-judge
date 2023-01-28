import { Injectable } from '@nestjs/common';
import { leftShift } from 'src/lib/leftShift';
import { UserProblemAttemptsService } from 'src/modules/problems/services/user-problem-attempts.service';
import { GlobalScoreboardScoreCalculatorService } from '../global-scoreboard-score-calculator.service';
import {
  GlobalScoreboardScoreCalculationStrategy,
  GlobalScoreboardScoreCalculator,
} from '../interfaces';

const NUMBER_OF_LEFT_SHIFTS = 32;

@Injectable()
export class BySolveCountAndLastAcceptedTimeStrategy
  implements GlobalScoreboardScoreCalculator
{
  constructor(
    globalScoreboardScoreCalculatorService: GlobalScoreboardScoreCalculatorService,
    private readonly userProblemAttemptsService: UserProblemAttemptsService,
  ) {
    globalScoreboardScoreCalculatorService.plugService(
      GlobalScoreboardScoreCalculationStrategy.BY_SOLVE_COUNT_AND_LAST_SOLVE_TIME,
      this,
    );
  }

  async calculateScore(userId: number): Promise<number> {
    const userProblemAttempts =
      await this.userProblemAttemptsService.getAllUserProblemAttempts(userId);

    let solveCount = 0;
    let lastSolveAtInSeconds = 0;
    for (const userProblemAttempt of userProblemAttempts) {
      if (userProblemAttempt.alreadySolved()) {
        solveCount += 1;
        lastSolveAtInSeconds = Math.max(
          lastSolveAtInSeconds,
          Math.floor(userProblemAttempt.firstSolvedAt.getTime() / 1000),
        );
      }
    }

    /*
    At the time this app is build, lastSolveAtInSeconds's value is around 1.6 billion (< 2^32).
    We will encode the score as the following:
    (solveCount << 32) + ((1 << 32) - 1) - lastSolveAtInSeconds

    This way, we can ensure that:
    * If the solveCount are different, the larger one will have larger score
    * If the solveCount are the same, the one with smaller lastSolveAtInSeconds will have larger score
     */

    return (
      leftShift(solveCount, NUMBER_OF_LEFT_SHIFTS) +
      (leftShift(1, NUMBER_OF_LEFT_SHIFTS) - 1) -
      lastSolveAtInSeconds
    );
  }
}
