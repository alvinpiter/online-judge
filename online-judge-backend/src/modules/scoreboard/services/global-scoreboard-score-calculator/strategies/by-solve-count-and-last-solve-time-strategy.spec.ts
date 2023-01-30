import {
  BySolveCountAndLastSolveTimeScoringSchema,
  BySolveCountAndLastSolveTimeStrategy,
} from './by-solve-count-and-last-solve-time.strategy';
import { GlobalScoreboardScoreCalculatorService } from '../global-scoreboard-score-calculator.service';
import { UserProblemAttemptsService } from 'src/modules/problems/services/user-problem-attempts.service';
import { UserProblemAttempt } from 'src/modules/problems/entities/user-problem-attempt.entity';
import { createUser } from 'src/lib/tests/createUser';
import { createUserProblemAttempt } from 'src/lib/tests/createUserProblemAttempt';
import { leftShift } from 'src/lib/leftShift';
import { GlobalScoreboardScoreCalculationStrategy } from '../interfaces';

describe(BySolveCountAndLastSolveTimeStrategy.name, () => {
  const globalScoreboardCalulcatorService =
    GlobalScoreboardScoreCalculatorService.prototype;
  const userProblemAttemptsService = UserProblemAttemptsService.prototype;
  let service: BySolveCountAndLastSolveTimeStrategy;

  beforeEach(() => {
    jest
      .spyOn(globalScoreboardCalulcatorService, 'plugService')
      .mockImplementation();

    service = new BySolveCountAndLastSolveTimeStrategy(
      globalScoreboardCalulcatorService,
      userProblemAttemptsService,
    );
  });

  describe('constructor', () => {
    it('registers itself to GlobalScoreboardCalculatorService', () => {
      expect(
        globalScoreboardCalulcatorService.plugService,
      ).toHaveBeenCalledWith(
        GlobalScoreboardScoreCalculationStrategy.BY_SOLVE_COUNT_AND_LAST_SOLVE_TIME,
        service,
      );
    });
  });

  describe('calculateScore', () => {
    const user = createUser(1);
    const userProblemAttempts: UserProblemAttempt[] = [
      createUserProblemAttempt(1, user.id, 1, 0, new Date('2023-01-30 17:20')),
      createUserProblemAttempt(1, user.id, 2, 1, new Date('2023-01-30 17:15')),
      createUserProblemAttempt(1, user.id, 3, 3, null),
    ];

    it('returns the correct result', async () => {
      jest
        .spyOn(userProblemAttemptsService, 'getAllUserProblemAttempts')
        .mockResolvedValue(userProblemAttempts);

      const result = await service.calculateScore(user.id);
      const expectedResult =
        leftShift(2, 42) +
        (leftShift(1, 42) - 1) -
        new Date('2023-01-30 17:20').getTime();

      expect(
        userProblemAttemptsService.getAllUserProblemAttempts,
      ).toHaveBeenCalledWith(user.id);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('decodeScore', () => {
    const score =
      leftShift(12, 42) +
      (leftShift(1, 42) - 1) -
      new Date('2023-01-30 17:20').getTime();

    it('returns the correct result', async () => {
      const result = await service.decodeScore(score);
      const expectedResult: BySolveCountAndLastSolveTimeScoringSchema = {
        solveCount: 12,
        lastSolveTimeInMilliseconds: new Date('2023-01-30 17:20').getTime(),
      };

      expect(result).toEqual(expectedResult);
    });
  });
});
