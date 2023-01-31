import { Injectable } from '@nestjs/common';
import { leftShift } from 'src/lib/leftShift';
import { rightShift } from 'src/lib/rightShift';
import { UserProblemAttemptsService } from 'src/modules/problems/services/user-problem-attempts.service';
import {
  ScoreboardScoreCalculationStrategy,
  ScoreboardScoreCalculator,
} from '../interfaces';
import { ScoreboardScoreCalculatorService } from '../scoreboard-score-calculator.service';

const NUMBER_OF_SHIFTS = 42;

export interface BySolveCountAndLastSolveTimeScoringSchema {
  solveCount: number;
  lastSolveTimeInMilliseconds: number;
}

@Injectable()
export class BySolveCountAndLastSolveTimeStrategy
  implements ScoreboardScoreCalculator
{
  constructor(
    scoreboardScoreCalculatorService: ScoreboardScoreCalculatorService,
    private readonly userProblemAttemptsService: UserProblemAttemptsService,
  ) {
    scoreboardScoreCalculatorService.plugService(
      ScoreboardScoreCalculationStrategy.BY_SOLVE_COUNT_AND_LAST_SOLVE_TIME,
      this,
    );
  }

  async calculateScore(userId: number): Promise<number> {
    const userProblemAttempts =
      await this.userProblemAttemptsService.getAllUserProblemAttempts(userId);

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

  async decodeScore(
    score: number,
  ): Promise<BySolveCountAndLastSolveTimeScoringSchema> {
    const solveCount = rightShift(score, NUMBER_OF_SHIFTS);
    const lastSolveTimeInMilliseconds =
      leftShift(solveCount, NUMBER_OF_SHIFTS) +
      (leftShift(1, NUMBER_OF_SHIFTS) - 1) -
      score;

    return {
      solveCount,
      lastSolveTimeInMilliseconds,
    };
  }
}